import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../device/devices.service';
import { Device } from '../device/device.model';
import { Subscription } from 'rxjs';
import { BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb-item.model';

@Component({
  selector: 'app-spectator',
  templateUrl: './spectator.component.html',
  styleUrls: ['./spectator.component.scss']
})
export class SpectatorComponent implements OnInit {

  public breadcrumbItems: BreadcrumbItem[] = [{ label: 'Spectate' }];
  public devices: Device[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private devicesService: DevicesService
  ) { }

  public ngOnInit(): void {
    const sub: Subscription = this.devicesService.getDevices().subscribe((devices: Device[]) => {
      this.devices = devices;
    });
    this.subscriptions.add(sub);
  }

}
