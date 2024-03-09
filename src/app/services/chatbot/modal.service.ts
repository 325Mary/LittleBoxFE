import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  modalOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  openModal() {
    this.modalOpen.emit(true);
  }

  closeModal() {
    this.modalOpen.emit(false);
  }
}
