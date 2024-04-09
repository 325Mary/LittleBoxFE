import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubcWtComponent } from './form-subc-wt.component';

describe('FormSubcWtComponent', () => {
  let component: FormSubcWtComponent;
  let fixture: ComponentFixture<FormSubcWtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSubcWtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSubcWtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
