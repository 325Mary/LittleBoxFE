import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatbodyComponent } from '../ChatBot/chatbody/chatbody.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private modalService: NgbModal) { }

  openModal() {
    const modalRef = this.modalService.open(ChatbodyComponent, { size: 'lg' });
  }
}
