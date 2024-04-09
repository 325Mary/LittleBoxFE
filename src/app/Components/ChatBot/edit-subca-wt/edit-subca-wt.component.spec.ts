import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubcaWtComponent } from './edit-subca-wt.component';

describe('EditSubcaWtComponent', () => {
  let component: EditSubcaWtComponent;
  let fixture: ComponentFixture<EditSubcaWtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSubcaWtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSubcaWtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
