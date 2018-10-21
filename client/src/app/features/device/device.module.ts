import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices/devices.component';
import { DeviceStreamingComponent } from './device-streaming/device-streaming.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    DevicesComponent,
    DeviceStreamingComponent
  ],
  declarations: [DevicesComponent, DeviceStreamingComponent]
})
export class DeviceModule { }
