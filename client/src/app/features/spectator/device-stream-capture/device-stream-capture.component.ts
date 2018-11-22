import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Device } from '../../device/device.model';
import { SocketEventsService } from '../../../core/socket-events.service';
import { SOCKET_URL } from '../../../url.constants';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { SocketStream } from '../../../core/socket-stream';
import { Observable, Subscription } from 'rxjs';
import { FrameAction, ReadyToCaptureAction, StreamStateChangedAction } from '../../../shared/stream/stream-actions.model';
import { ImageConfig } from '../../../shared/stream/image-filter.enum';
import { BrowserNotificationsService } from '../../../core/browser-notifications.service';

@Component({
  selector: 'app-device-stream-capture',
  templateUrl: './device-stream-capture.component.html',
  styleUrls: ['./device-stream-capture.component.scss']
})
export class DeviceStreamCaptureComponent implements OnInit, OnDestroy {

  @Input() device: Device;
  @Input() imageConfig: ImageConfig;

  public stream: SocketStream;
  public frames$: Observable<string>;
  public isStreaming = false;
  public motionDetected = false;

  private subscriptions: Subscription = new Subscription();
  private motionDetectionTimeout;

  constructor(
    private socketEventsService: SocketEventsService,
    private authService: AuthService,
    private browserNotificationsService: BrowserNotificationsService
  ) {
  }

  public ngOnInit(): void {
    const user: User = this.authService.getUser();
    const room = `${user.id}:${this.device.id}`;

    const socketSub: Subscription = this.socketEventsService.open(SOCKET_URL, room)
      .subscribe((stream: SocketStream) => {
        this.stream = stream;

        this.stream.emit(new ReadyToCaptureAction());
        const streamSub: Subscription = this.stream.on<boolean>(StreamStateChangedAction.type)
          .subscribe(isStreaming => {
            this.isStreaming = isStreaming;
          });
        this.subscriptions.add(streamSub);

        this.frames$ = this.stream.on<string>(FrameAction.type);
      });

    this.subscriptions.add(socketSub);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (this.stream) {
      this.stream.close();
    }
  }

  public onMotion(): void {
    if (!this.motionDetected) {
      this.motionDetected = true;
      this.browserNotificationsService.push('ProtectedHome', {
        body: `We have detected motion on ${this.device.name} device.`
      });
    }

    clearTimeout(this.motionDetectionTimeout);
    this.motionDetectionTimeout = setTimeout(() => {
      this.motionDetected = false;
    }, 1000);
  }
}
