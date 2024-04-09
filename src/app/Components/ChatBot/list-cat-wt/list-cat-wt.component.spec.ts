import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCatWtComponent } from './list-cat-wt.component';

describe('ListCatWtComponent', () => {
  let component: ListCatWtComponent;
  let fixture: ComponentFixture<ListCatWtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCatWtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCatWtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
