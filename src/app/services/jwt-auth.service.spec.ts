import { TestBed, inject } from '@angular/core/testing';

import { JwtAuthService } from './jwt-auth.service';

describe('JwtAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtAuthService]
    });
  });

  it('should be created', inject([JwtAuthService], (service: JwtAuthService) => {
    expect(service).toBeTruthy();
  }));
});
