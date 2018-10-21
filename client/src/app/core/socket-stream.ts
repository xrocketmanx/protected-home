import { Observable, Observer } from 'rxjs';
import { SocketAction, SocketEvent, SocketEventType } from './socket-event.model';
import { filter, map, share } from 'rxjs/operators';

export class SocketStream {

  private actions$: Observable<SocketAction>;

  constructor(
    private socket: WebSocket,
    private room: string,
    private closeSocket: () => void
  ) {
    this.actions$ = this.getActionsStream();
  }

  public on<T>(actionType: string): Observable<T> {
    return this.actions$.pipe(
      filter(action => action.type === actionType),
      map((action: SocketAction) => action.payload)
    );
  }

  public emit(action: SocketAction): void {
    const event: SocketEvent = new SocketEvent(this.room, SocketEventType.ACTION, action);
    this.send(event);
  }

  public close(): void {
    this.send(new SocketEvent(this.room, SocketEventType.UNSUBSCRIBE));
    this.closeSocket();
  }

  private getActionsStream(): Observable<SocketAction> {
    return Observable.create((observer: Observer<SocketAction>) => {
      this.send(new SocketEvent(this.room, SocketEventType.SUBSCRIBE));

      this.socket.addEventListener('message', (event: any) => {
        const action: SocketAction = JSON.parse(event.data);
        observer.next(action);
      });

      return () => {
        this.send(new SocketEvent(this.room, SocketEventType.UNSUBSCRIBE));
      };
    }).pipe(
      share()
    );
  }

  private send(event: SocketEvent): void {
    this.socket.send(JSON.stringify(event));
  }
}
