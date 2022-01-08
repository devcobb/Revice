import { TestBed } from '@angular/core/testing';

import { HeaderTransparencyService } from './header-transparency.service';

describe('HeaderTransparencyService', () => {
  let service: HeaderTransparencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderTransparencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
