import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  showModal: boolean = false;

  onShowModalChange(event: boolean) {
    console.log('Valor de showModal:', event);
    this.showModal = event; 
  }
}

