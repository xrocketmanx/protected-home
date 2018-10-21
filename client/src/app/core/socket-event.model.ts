export enum SocketEventType {
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE',
  ACTION = 'ACTION'
}

export class SocketAction {
  constructor(
    public type: string,
    public payload?: any
  ) {}
}

export class SocketEvent {
  constructor(
    public readonly room: string,
    public readonly type: SocketEventType,
    public readonly action?: SocketAction
  ) {}
}
