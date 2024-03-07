import { TestBed } from '@angular/core/testing';

import { IngresoServiceService } from './ingreso.service.service';

describe('IngresoServiceService', () => {
  let service: IngresoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
