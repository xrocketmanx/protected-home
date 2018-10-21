import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStreamCaptureComponent } from './device-stream-capture.component';

describe('DeviceStreamCaptureComponent', () => {
  let component: DeviceStreamCaptureComponent;
  let fixture: ComponentFixture<DeviceStreamCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceStreamCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStreamCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
