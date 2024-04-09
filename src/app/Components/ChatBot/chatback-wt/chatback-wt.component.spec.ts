import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbackWtComponent } from './chatback-wt.component';

describe('ChatbackWtComponent', () => {
  let component: ChatbackWtComponent;
  let fixture: ComponentFixture<ChatbackWtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatbackWtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatbackWtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
