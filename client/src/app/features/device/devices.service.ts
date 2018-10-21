import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from './device.model';
import { getDevicesUrl, getDeviceUrl } from '../../core/url-helper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(
    private http: HttpClient
  ) { }

  public getDevices(): Observable<Device[]> {
    const url: string = getDevicesUrl();

    return this.http.get<{ devices: Device[] }>(url).pipe(
      map(resp => resp.devices)
    );
  }

  public addDevice(deviceName: string): Observable<Device> {
    const url: string = getDevicesUrl();
    const device = { name: deviceName };

    return this.http.post<Device>(url, { device });
  }

  public getDevice(id: number): Observable<Device> {
    const url: string = getDeviceUrl(id);

    return this.http.get<Device>(url);
  }

  public deleteDevice(id: number): Observable<void> {
    const url: string = getDeviceUrl(id);

    return this.http.delete<void>(url);
  }
}
