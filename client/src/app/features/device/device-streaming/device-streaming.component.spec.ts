import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStreamingComponent } from './device-streaming.component';

describe('DeviceStreamingComponent', () => {
  let component: DeviceStreamingComponent;
  let fixture: ComponentFixture<DeviceStreamingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceStreamingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
