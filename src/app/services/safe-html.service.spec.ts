import { TestBed, inject } from '@angular/core/testing';

import { SafeHTMLService } from './safe-html.service';

describe('SafeHTMLService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafeHTMLService]
    });
  });

  it('should be created', inject([SafeHTMLService], (service: SafeHTMLService) => {
    expect(service).toBeTruthy();
  }));
});
