import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCatWtComponent } from './edit-cat-wt.component';

describe('EditCatWtComponent', () => {
  let component: EditCatWtComponent;
  let fixture: ComponentFixture<EditCatWtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCatWtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCatWtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
