import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQueriesComponent } from './form-queries.component';

describe('FormQueriesComponent', () => {
  let component: FormQueriesComponent;
  let fixture: ComponentFixture<FormQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormQueriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
