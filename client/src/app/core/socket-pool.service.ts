import { Injectable } from '@angular/core';
import { SocketConnection } from './socket-connection.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketPoolService {

  private connections: { [url: string]: SocketConnection } = {};

  constructor() { }

  public connect(url: string): Observable<WebSocket> {
    if (!this.connections[url]) {
      const socket: WebSocket = new WebSocket(url);
      const socketSubject: BehaviorSubject<WebSocket> = new BehaviorSubject<WebSocket>(null);

      socket.addEventListener('open', () => socketSubject.next(socket));
      socket.addEventListener('close', () => delete this.connections[url]);

      this.connections[url] = new SocketConnection(socket, 1, socketSubject);
    } else {
      this.connections[url].listeners += 1;
    }

    return this.connections[url].socketSubject.asObservable().pipe(
      filter(socket => !!socket),
      take(1)
    );
  }

  public disconnect(url: string): void {
    const connection: SocketConnection = this.connections[url];
    if (connection.listeners > 1) {
      connection.listeners -= 1;
    } else {
      connection.socket.close();
    }
  }
}
