import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ImageConfig, ImageFilter } from './image-filter.enum';
import { WebDspService } from '../../core/web-dsp.service';
import { mergeMapTo, tap } from 'rxjs/operators';

@Component({
  selector: 'app-stream-capture',
  templateUrl: './stream-capture.component.html',
  styleUrls: ['./stream-capture.component.scss']
})
export class StreamCaptureComponent implements AfterViewInit, OnDestroy {
  @Input() width: number;
  @Input() height: number;
  @Input() frames$: Observable<string>;
  @Input() imageConfig: ImageConfig;

  @ViewChild('image')
  set imageSetter(el: ElementRef<HTMLImageElement>) {
    this.image = el.nativeElement;
  }

  @ViewChild('hiddenImage')
  set hiddenImageSetter(el: ElementRef<HTMLImageElement>) {
    this.hiddenImage = el.nativeElement;
  }

  @ViewChild('canvas')
  set canvasSetter(el: ElementRef<HTMLCanvasElement>) {
    this.canvas = el.nativeElement;
  }

  private image: HTMLImageElement;
  private hiddenImage: HTMLImageElement;
  private canvas: HTMLCanvasElement;

  private webDsp;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private webDspService: WebDspService
  ) {
  }

  public ngAfterViewInit(): void {
    const sub: Subscription = this.webDspService.getWebDsp().pipe(
      tap((webDsp) => this.webDsp = webDsp),
      mergeMapTo(this.frames$)
    ).subscribe((frame: string) => {
      if (this.imageConfig.filter || this.imageConfig.contrast || this.imageConfig.brightness) {
        this.hiddenImage.src = frame;
      } else {
        this.image.src = frame;
      }
    });

    this.subscriptions.add(sub);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public applyFilter(): void {
    const {brightness, contrast} = this.imageConfig;

    const context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    context.drawImage(this.hiddenImage, 0, 0, this.width, this.height);
    const pixels: ImageData = context.getImageData(0, 0, this.width, this.height);

    if (brightness) {
      this.brighten(pixels, brightness);
    }

    if (contrast) {
      this.contrast(pixels, contrast);
    }

    context.putImageData(this.transformPixels(pixels), 0, 0);

    this.image.src = this.canvas.toDataURL();
  }

  private transformPixels(pixels: ImageData): ImageData {
    switch (this.imageConfig.filter) {
      case ImageFilter.GRAY_SCALE:
        pixels.data.set(this.webDsp.grayScale(pixels.data));
        break;
      case ImageFilter.BLUR:
        pixels.data.set(this.webDsp.blur(pixels.data, this.width, this.height));
        break;
      case ImageFilter.INVERT:
        pixels.data.set(this.webDsp.invert(pixels.data));
        break;
    }

    return pixels;
  }

  private brighten(pixels: ImageData, value: number): void {
    const data: Uint8ClampedArray = pixels.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] += value;
      data[i + 1] += value;
      data[i + 2] += value;
    }
  }

  private contrast(pixels: ImageData, value: number): void {
    const data: Uint8ClampedArray = pixels.data;
    const contrast = (value / 100) + 1;
    const intercept = 128 * (1 - contrast);

    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] * contrast + intercept;
      data[i + 1] = data[i + 1] * contrast + intercept;
      data[i + 2] = data[i + 2] * contrast + intercept;
    }
  }
}
