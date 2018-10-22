import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebDspService {

  private webDspModule = window['webdsp'];
  // TODO: add type for WebDsp
  private webDspSubject: BehaviorSubject<any>;

  constructor() {
    this.webDspSubject = this.getWebDspSubject();
  }

  public getWebDsp(): Observable<any> {
    return this.webDspSubject.asObservable().pipe(
      filter(webDsp => !!webDsp),
      take(1)
    );
  }

  private getWebDspSubject(): BehaviorSubject<any> {
    const webDspSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this.webDspModule.loadWASM().then((webDsp) => {
      webDspSubject.next(webDsp);
    });

    return webDspSubject;
  }
}
