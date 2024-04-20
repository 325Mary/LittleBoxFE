import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgChatbotComponent } from './img-chatbot.component';

describe('ImgChatbotComponent', () => {
  let component: ImgChatbotComponent;
  let fixture: ComponentFixture<ImgChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgChatbotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
