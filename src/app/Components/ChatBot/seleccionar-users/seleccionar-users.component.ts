import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from '../menu/menu.component';
import { WTMenuComponent } from '../wtmenu/wtmenu.component';

@Component({
  selector: 'app-seleccionar-users',
  templateUrl: './seleccionar-users.component.html',
  styleUrl: './seleccionar-users.component.scss'
})
export class SeleccionarUsersComponent {
  constructor(private modalService: NgbModal) {}

  openModalWT() {
    const modalRef = this.modalService.open(WTMenuComponent, {
      size: 'lg',
      windowClass: 'custom-modal',
    });
  }

  openModal() {
    const modalRef = this.modalService.open(MenuComponent, {
      size: 'lg',
      windowClass: 'custom-modal',
    });
  }
}
