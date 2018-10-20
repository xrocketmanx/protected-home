import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevicesService } from '../devices.service';
import { Subscription } from 'rxjs';
import { Device } from '../device.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {
  public devices: Device[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private devicesService: DevicesService
  ) { }

  public ngOnInit(): void {
    const sub: Subscription = this.devicesService.getDevices()
      .subscribe((devices: Device[]) => {
        this.devices = devices;
    });
    this.subscriptions.add(sub);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
