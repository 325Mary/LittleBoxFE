import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQueriesComponent } from './edit-queries.component';

describe('EditQueriesComponent', () => {
  let component: EditQueriesComponent;
  let fixture: ComponentFixture<EditQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditQueriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
