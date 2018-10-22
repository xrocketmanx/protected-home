import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { FrameType } from './frame-type.enum';
import { WebDspService } from '../../core/web-dsp.service';

class VideoDimensions {
  width: number;
  height: number;
}

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements AfterViewInit, OnDestroy {

  @Input() width: number;
  @Input() height: number;
  @Input() fps: number;
  @Input() frameType: FrameType = FrameType.JPEG;

  @Output() frame: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('video')
  set videoSetter(el: ElementRef<HTMLVideoElement>) {
    this.video = el.nativeElement;
  }
  @ViewChild('canvas')
  set canvasSetter(el: ElementRef<HTMLCanvasElement>) {
    this.canvas = el.nativeElement;
  }

  private mediaDevices: MediaDevices = window.navigator.mediaDevices;
  private video: HTMLVideoElement;
  private canvas: HTMLCanvasElement;
  private stream: MediaStream;
  private webDsp;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private webDspService: WebDspService
  ) { }

  public ngAfterViewInit(): void {
    this.webDspService.getWebDsp().toPromise().then((webDsp) => {
      this.webDsp = webDsp;

      return this.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
    }).then((stream: MediaStream) => {
      this.stream = stream;
      this.video.srcObject = this.stream;
      this.video.play();
    });
  }

  public ngOnDestroy(): void {
    if (this.stream) {
      this.stream.getTracks()[0].stop();
    }
    this.subscriptions.unsubscribe();
  }

  public startRecording(): void {
    const timeout: number = this.fps ? 1000 / this.fps : 50;
    const dimensions: VideoDimensions = this.getVideoDimensions();

    this.video.width = dimensions.width;
    this.video.height = dimensions.height;
    this.canvas.width = dimensions.width;
    this.canvas.height = dimensions.height;

    const sub: Subscription = interval(timeout).subscribe(() => {
      const context: CanvasRenderingContext2D = this.canvas.getContext('2d');
      context.drawImage(this.video, 0, 0, dimensions.width, dimensions.height);

      // Apply filters
      const pixels = context.getImageData(0, 0, dimensions.width, dimensions.height);
      pixels.data.set(this.webDsp.grayScale(pixels.data));
      context.putImageData(pixels, 0, 0);

      const dataUrl: string = this.canvas.toDataURL(this.frameType);
      this.frame.emit(dataUrl);
    });
    this.subscriptions.add(sub);
  }

  private getVideoDimensions(): VideoDimensions {
    let width;
    let height;

    if (!(this.width && this.height)) {
      if (this.width) {
        height = this.video.videoHeight / (this.video.videoWidth / this.width);
      } else if (this.height) {
        width = this.video.videoWidth / (this.video.videoHeight / this.height);
      } else {
        width = this.video.videoWidth;
        height = this.video.videoHeight;
      }
    }

    return {
      width: width || this.width,
      height: height || this.height
    };
  }
}
