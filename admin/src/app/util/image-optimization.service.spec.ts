import { TestBed, inject } from '@angular/core/testing';

import { ImageOptimizationService } from './image-optimization.service';

describe('ImageOptimizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageOptimizationService]
    });
  });

  it('should be created', inject([ImageOptimizationService], (service: ImageOptimizationService) => {
    expect(service).toBeTruthy();
  }));
});
