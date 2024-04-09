import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubcaWtComponent } from './list-subca-wt.component';

describe('ListSubcaWtComponent', () => {
  let component: ListSubcaWtComponent;
  let fixture: ComponentFixture<ListSubcaWtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSubcaWtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSubcaWtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
