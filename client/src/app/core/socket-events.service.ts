import { Injectable } from '@angular/core';
import { SocketPoolService } from './socket-pool.service';
import { SocketStream } from './socket-stream';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketEventsService {

  constructor(
    private socketPoolService: SocketPoolService
  ) {
    this.close = this.close.bind(this);
  }

  public open(url: string, room: string): Observable<SocketStream> {
    return this.socketPoolService.connect(url).pipe(
      map((socket: WebSocket) => new SocketStream(socket, room, () => this.close(url)))
    );
  }

  private close(url: string) {
    this.socketPoolService.disconnect(url);
  }
}
