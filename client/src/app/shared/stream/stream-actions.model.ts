import { SocketAction } from '../../core/socket-event.model';

export class FrameAction extends SocketAction {
  public static readonly type = 'FRAME';

  constructor(
    public payload: string,
  ) {
    super(FrameAction.type, payload);
  }
}

export class ReadyToCaptureAction extends SocketAction {
  public static readonly type = 'READY_TO_CAPTURE';

  constructor() {
    super(ReadyToCaptureAction.type);
  }
}

export class StreamStateChangedAction extends SocketAction {
  public static readonly type = 'STREAM_STATE_CHANGED';

  constructor(
    isStreaming: boolean
  ) {
    super(StreamStateChangedAction.type, isStreaming);
  }
}
