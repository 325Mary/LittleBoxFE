import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQueWtComponent } from './form-que-wt.component';

describe('FormQueWtComponent', () => {
  let component: FormQueWtComponent;
  let fixture: ComponentFixture<FormQueWtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormQueWtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormQueWtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
