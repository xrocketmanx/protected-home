import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb-item.model';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { DevicesService } from '../devices.service';
import { Device } from '../device.model';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { SocketEventsService } from '../../../core/socket-events.service';
import { SocketStream } from '../../../core/socket-stream';
import { SOCKET_URL } from '../../../url.constants';
import { FrameAction, ReadyToCaptureAction, StreamStateChangedAction } from '../../../shared/stream/stream-actions.model';

@Component({
  selector: 'app-device-streaming',
  templateUrl: './device-streaming.component.html',
  styleUrls: ['./device-streaming.component.scss']
})
export class DeviceStreamingComponent implements OnInit, OnDestroy {

  public breadcrumbItems: BreadcrumbItem[] = [];
  public device: Device;

  private subscriptions: Subscription = new Subscription();
  private socketStream: SocketStream;

  constructor(
    public route: ActivatedRoute,
    public devicesService: DevicesService,
    public authService: AuthService,
    private socketEventsService: SocketEventsService
  ) {
  }

  public ngOnInit(): void {
    const sub: Subscription = this.route.params.pipe(
      mergeMap((params: Params) => {
        const user: User = this.authService.getUser();
        const room = `${user.id}:${params.id}`;

        return forkJoin<Device, SocketStream>([
          this.devicesService.getDevice(params.id),
          this.socketEventsService.open(SOCKET_URL, room)
        ]);
      }),
      mergeMap(([device, socketStream]: [Device, SocketStream]) => {
        this.breadcrumbItems = [{label: 'Devices', url: '/devices'}, {label: device.name}];
        this.device = device;
        this.socketStream = socketStream;

        // Notify that streaming begins
        this.socketStream.emit(new StreamStateChangedAction(true));

        return this.socketStream.on<void>(ReadyToCaptureAction.type);
      })
    ).subscribe(() => {
      // Notify joined spectators that stream is going
      this.socketStream.emit(new StreamStateChangedAction(true));
    });

    this.subscriptions.add(sub);
  }

  public ngOnDestroy(): void {
    // Notify that streaming ends
    this.socketStream.emit(new StreamStateChangedAction(false));

    this.subscriptions.unsubscribe();
    if (this.socketStream) {
      this.socketStream.close();
    }
  }

  public sendFrame(frame: string): void {
    this.socketStream.emit(new FrameAction(frame));
  }

}
