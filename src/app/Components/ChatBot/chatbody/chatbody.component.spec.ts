import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbodyComponent } from './chatbody.component';

describe('ChatbodyComponent', () => {
  let component: ChatbodyComponent;
  let fixture: ComponentFixture<ChatbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatbodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
