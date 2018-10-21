import { BehaviorSubject } from 'rxjs';

export class SocketConnection {
  constructor(
    public socket: WebSocket,
    public listeners: number,
    public socketSubject: BehaviorSubject<WebSocket>
  ) {}
}
