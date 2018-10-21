import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevicesService } from '../devices.service';
import { Subscription } from 'rxjs';
import { Device } from '../device.model';
import { BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb-item.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {
  public devices: Device[] = [];
  public readonly breadcrumbItems: BreadcrumbItem[] = [{ label: 'Devices' }];
  public deviceForm: FormGroup;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private devicesService: DevicesService,
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.deviceForm = this.fb.group({
      name: ['', Validators.required]
    });
    const sub: Subscription = this.devicesService.getDevices()
      .subscribe((devices: Device[]) => {
        this.devices = devices;
    });
    this.subscriptions.add(sub);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getLinkToDevice(device: Device): string {
    return `/devices/${device.id}/streaming`;
  }

  public deleteDevice(device: Device): void {
    this.devicesService.deleteDevice(device.id).subscribe(() => {
      this.devices = this.devices.filter(({ id }) => id !== device.id);
    });
  }

  public addDevice(): void {
    if (this.deviceForm.valid) {
      const deviceName: string = this.deviceForm.get('name').value;
      this.devicesService.addDevice(deviceName).subscribe((device: Device) => {
        this.deviceForm.reset();
        this.devices.push(device);
      });
    }
  }

}
