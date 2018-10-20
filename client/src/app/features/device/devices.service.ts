import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from './device.model';
import { getDevicesUrl } from '../../core/url-helper';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(
    private http: HttpClient
  ) { }

  public getDevices(): Observable<Device[]> {
    const url: string = getDevicesUrl();

    return this.http.get<Device[]>(url);
  }
}
