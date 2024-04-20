import { TestBed } from '@angular/core/testing';

import { SSubcategoryService } from './ssubcategory.service';

describe('SSubcategoryService', () => {
  let service: SSubcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SSubcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
