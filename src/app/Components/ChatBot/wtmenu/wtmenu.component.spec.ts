import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WTMenuComponent } from './wtmenu.component';

describe('WTMenuComponent', () => {
  let component: WTMenuComponent;
  let fixture: ComponentFixture<WTMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WTMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WTMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
