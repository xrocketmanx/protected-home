import { TestBed } from '@angular/core/testing';

import { WebDspService } from './web-dsp.service';

describe('WebDspService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebDspService = TestBed.get(WebDspService);
    expect(service).toBeTruthy();
  });
});
