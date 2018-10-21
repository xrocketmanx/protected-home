import { Observable, Observer, Subscription } from 'rxjs';
import { SocketAction, SocketEvent, SocketEventType } from './socket-event.model';
import { filter, map, share } from 'rxjs/operators';

export class SocketStream {

  private actions$: Observable<SocketAction>;
  private close$: Observable<void>;

  constructor(
    private socket: WebSocket,
    private room: string,
    private closeSocket: () => void
  ) {
    this.actions$ = this.getActionsStream();
    this.close$ = this.getCloseStream();
  }

  public on<T>(actionType: string): Observable<T> {
    return this.actions$.pipe(
      filter(action => action.type === actionType),
      map((action: SocketAction) => action.payload)
    );
  }

  public onClose(): Observable<void> {
    return this.close$;
  }

  public emit(action: SocketAction): void {
    const event: SocketEvent = new SocketEvent(this.room, SocketEventType.ACTION, action);
    this.send(event);
  }

  public close(): void {
    this.closeSocket();
  }

  private getActionsStream(): Observable<SocketAction> {
    return Observable.create((observer: Observer<SocketAction>) => {
      this.send(new SocketEvent(this.room, SocketEventType.SUBSCRIBE));

      const onMessage = (event: any) => {
        const socketEvent: SocketEvent = JSON.parse(event.data);
        if (socketEvent.room === this.room) {
          observer.next(socketEvent.action);
        }
      };

      this.socket.addEventListener('message', onMessage);

      const closeSub: Subscription = this.close$.subscribe(observer.complete);

      return () => {
        closeSub.unsubscribe();
        this.socket.removeEventListener('message', onMessage);
        this.send(new SocketEvent(this.room, SocketEventType.UNSUBSCRIBE));
      };
    }).pipe(
      share()
    );
  }

  private getCloseStream(): Observable<void> {
    return Observable.create((observer) => {
      const onClose = () => {
        this.socket.removeEventListener('close', onClose);
        observer.next();
        observer.complete();
      };

      return () => {
        this.socket.removeEventListener('close', onClose);
      };
    }).pipe(
      share()
    );
  }

  private send(event: SocketEvent): void {
    if (this.socket.readyState !== 3 && this.socket.readyState !== 2) {
      this.socket.send(JSON.stringify(event));
    }
  }
}
