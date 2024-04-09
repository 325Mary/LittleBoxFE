import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQueWtComponent } from './edit-que-wt.component';

describe('EditQueWtComponent', () => {
  let component: EditQueWtComponent;
  let fixture: ComponentFixture<EditQueWtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditQueWtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQueWtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
