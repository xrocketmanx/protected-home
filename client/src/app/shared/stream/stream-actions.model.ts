import { SocketAction } from '../../core/socket-event.model';

export class FrameAction extends SocketAction {
  public static readonly type = 'FRAME';

  constructor(
    public payload: string,
  ) {
    super(FrameAction.type, payload);
  }
}
