import { TestBed } from '@angular/core/testing';

import { SCategoryService } from './scategory.service';

describe('SCategoryService', () => {
  let service: SCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
