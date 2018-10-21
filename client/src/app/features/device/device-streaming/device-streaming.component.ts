import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb-item.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DevicesService } from '../devices.service';
import { Device } from '../device.model';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-device-streaming',
  templateUrl: './device-streaming.component.html',
  styleUrls: ['./device-streaming.component.scss']
})
export class DeviceStreamingComponent implements OnInit, OnDestroy {

  public breadcrumbItems: BreadcrumbItem[] = [];
  public device: Device;
  public room: string;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public route: ActivatedRoute,
    public devicesService: DevicesService,
    public authService: AuthService
  ) { }

  public ngOnInit(): void {
    const sub: Subscription = this.route.params.pipe(
      mergeMap((params: Params) => this.devicesService.getDevice(params.id))
    ).subscribe((device: Device) => {
      const user: User = this.authService.getUser();

      this.breadcrumbItems = [{ label: 'Devices', url: '/devices' }, { label: device.name }];
      this.device = device;
      this.room = `${user.id}:${device.id}`;
    });
    this.subscriptions.add(sub);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
