import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarUsersComponent } from './seleccionar-users.component';

describe('SeleccionarUsersComponent', () => {
  let component: SeleccionarUsersComponent;
  let fixture: ComponentFixture<SeleccionarUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeleccionarUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeleccionarUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
