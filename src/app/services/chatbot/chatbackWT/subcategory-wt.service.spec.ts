import { TestBed } from '@angular/core/testing';

import { SubcategoryWtService } from './subcategory-wt.service';

describe('SubcategoryWtService', () => {
  let service: SubcategoryWtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoryWtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
