import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-stream-capture',
  templateUrl: './stream-capture.component.html',
  styleUrls: ['./stream-capture.component.scss']
})
export class StreamCaptureComponent implements AfterViewInit, OnDestroy {
  @Input() frames$: Observable<string>;

  @ViewChild('image')
  set imageSetter(el: ElementRef<HTMLImageElement>) {
    this.image = el.nativeElement;
  }

  private image: HTMLImageElement;
  private subscriptions: Subscription = new Subscription();

  constructor() { }

  public ngAfterViewInit(): void {
    const sub: Subscription = this.frames$.subscribe((frame: string) => {
      this.image.src = frame;
    });
    this.subscriptions.add(sub);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
