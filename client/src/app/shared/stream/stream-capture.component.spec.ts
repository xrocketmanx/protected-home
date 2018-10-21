import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamCaptureComponent } from './stream-capture.component';

describe('StreamCaptureComponent', () => {
  let component: StreamCaptureComponent;
  let fixture: ComponentFixture<StreamCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
