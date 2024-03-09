import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubcategoryComponent } from './form-subcategory.component';

describe('FormSubcategoryComponent', () => {
  let component: FormSubcategoryComponent;
  let fixture: ComponentFixture<FormSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSubcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
