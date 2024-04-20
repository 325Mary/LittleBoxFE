import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusBotComponent } from './menus-bot.component';

describe('MenusBotComponent', () => {
  let component: MenusBotComponent;
  let fixture: ComponentFixture<MenusBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenusBotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenusBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
