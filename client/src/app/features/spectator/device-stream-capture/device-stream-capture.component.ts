import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Device } from '../../device/device.model';
import { SocketEventsService } from '../../../core/socket-events.service';
import { SOCKET_URL } from '../../../url.constants';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { mergeMap, share} from 'rxjs/operators';
import { SocketStream } from '../../../core/socket-stream';
import { Observable } from 'rxjs';
import { FrameAction } from '../../../shared/stream/stream-actions.model';

@Component({
  selector: 'app-device-stream-capture',
  templateUrl: './device-stream-capture.component.html',
  styleUrls: ['./device-stream-capture.component.scss']
})
export class DeviceStreamCaptureComponent implements OnInit, OnDestroy {

  @Input() device: Device;

  public stream: SocketStream;
  public frames$: Observable<string>;
  // TODO: Implement logic for check if streaming is going
  public isStreaming = true;

  constructor(
    private socketEventsService: SocketEventsService,
    private authService: AuthService
  ) {
  }

  public ngOnInit(): void {
    const user: User = this.authService.getUser();
    const room = `${user.id}:${this.device.id}`;

    this.frames$ = this.socketEventsService.open(SOCKET_URL, room).pipe(
      mergeMap((stream: SocketStream) => {
        this.stream = stream;
        return this.stream.on<string>(FrameAction.type);
      }),
      share()
    );
  }

  public ngOnDestroy(): void {
    if (this.stream) {
      this.stream.close();
    }
  }

}
