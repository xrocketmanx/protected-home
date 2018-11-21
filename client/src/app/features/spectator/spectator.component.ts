import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../device/devices.service';
import { Device } from '../device/device.model';
import { Subscription } from 'rxjs';
import { BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb-item.model';
import { ImageConfig, ImageFilter } from '../../shared/stream/image-filter.enum';

@Component({
  selector: 'app-spectator',
  templateUrl: './spectator.component.html',
  styleUrls: ['./spectator.component.scss']
})
export class SpectatorComponent implements OnInit {

  public breadcrumbItems: BreadcrumbItem[] = [{ label: 'Spectate' }];
  public devices: Device[] = [];
  public imageConfig: ImageConfig = {
    brightness: 0,
    contrast: 0,
    filter: null,
    motionDetection: {
      enabled: false,
      threshold: 100,
      checkDensity: 100
    }
  };
  public ImageFilter: typeof ImageFilter = ImageFilter;

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

  public clearFilter(): void {
    this.imageConfig.filter = null;
  }

}
