import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCatWtComponent } from './form-cat-wt.component';

describe('FormCatWtComponent', () => {
  let component: FormCatWtComponent;
  let fixture: ComponentFixture<FormCatWtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCatWtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCatWtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
