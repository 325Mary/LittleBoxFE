import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQueWtComponent } from './list-que-wt.component';

describe('ListQueWtComponent', () => {
  let component: ListQueWtComponent;
  let fixture: ComponentFixture<ListQueWtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListQueWtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListQueWtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
