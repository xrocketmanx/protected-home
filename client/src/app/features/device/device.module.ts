import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices/devices.component';
import { DeviceTransmissionComponent } from './device-transmission/device-transmission.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DevicesComponent,
    DeviceTransmissionComponent
  ],
  declarations: [DevicesComponent, DeviceTransmissionComponent]
})
export class DeviceModule { }
