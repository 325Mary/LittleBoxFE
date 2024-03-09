import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovableImageComponent } from './movable-image.component';

describe('MovableImageComponent', () => {
  let component: MovableImageComponent;
  let fixture: ComponentFixture<MovableImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovableImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovableImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
