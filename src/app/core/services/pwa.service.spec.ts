import { TestBed, inject } from '@angular/core/testing';

import { PWAService } from './pwa.service';

describe('PWAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PWAService]
    });
  });

  it('should be created', inject([PWAService], (service: PWAService) => {
    expect(service).toBeTruthy();
  }));
});
