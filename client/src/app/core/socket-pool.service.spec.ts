import { TestBed } from '@angular/core/testing';

import { SocketPoolService } from './socket-pool.service';

describe('SocketPoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketPoolService = TestBed.get(SocketPoolService);
    expect(service).toBeTruthy();
  });
});
