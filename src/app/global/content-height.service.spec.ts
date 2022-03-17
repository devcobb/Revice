import { TestBed } from '@angular/core/testing';

import { ContentHeightService } from './content-height.service';

describe('ContentHeightService', () => {
  let service: ContentHeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentHeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
