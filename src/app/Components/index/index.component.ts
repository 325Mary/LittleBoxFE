import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatbackWtComponent } from '../ChatBot/chatback-wt/chatback-wt.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  constructor(private modalService: NgbModal) {}

  openModal() {
    const modalRef = this.modalService.open(ChatbackWtComponent, {
      size: 'lg',
      windowClass: 'custom-modal',
    });
  }
  
}

