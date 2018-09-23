import { TestBed, inject } from '@angular/core/testing';

import { TeachingsService } from './teachings.service';

describe('TeachingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeachingsService]
    });
  });

  it('should be created', inject([TeachingsService], (service: TeachingsService) => {
    expect(service).toBeTruthy();
  }));
});
