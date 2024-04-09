import { TestBed } from '@angular/core/testing';

import { CategoryWtService } from './category-wt.service';

describe('CategoryWtService', () => {
  let service: CategoryWtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryWtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
