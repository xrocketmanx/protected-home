export enum SocketEventType {
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE',
  ACTION = 'ACTION'
}

export class SocketAction {
  type: string;
  payload?: any;
}

export class SocketEvent {
  constructor(
    public readonly room: string,
    public readonly type: SocketEventType,
    public readonly action?: SocketAction
  ) {}
}
