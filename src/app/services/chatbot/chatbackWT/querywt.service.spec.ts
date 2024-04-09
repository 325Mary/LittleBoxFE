import { TestBed } from '@angular/core/testing';

import { QuerywtService } from './querywt.service';

describe('QuerywtService', () => {
  let service: QuerywtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuerywtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
