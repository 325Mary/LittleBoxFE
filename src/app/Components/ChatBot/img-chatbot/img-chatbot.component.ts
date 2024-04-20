import { Component } from '@angular/core';
import { ChatBodyComponent } from '../chat-body/chat-body.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-img-chatbot',
  templateUrl: './img-chatbot.component.html',
  styleUrl: './img-chatbot.component.scss'
})
export class ImgChatbotComponent {

  constructor(private modalService: NgbModal) {}
  openModal() {
    const modalRef = this.modalService.open(ChatBodyComponent, {
      size: 'lg',
      windowClass: 'custom-modal',
    });
  }
}
