import { TestBed } from '@angular/core/testing';

import { SQueryService } from './squery.service';

describe('SQueryService', () => {
  let service: SQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
