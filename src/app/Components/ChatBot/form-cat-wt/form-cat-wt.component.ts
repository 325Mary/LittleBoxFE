import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryWtService } from '../../../services/chatbot/chatbackWT/category-wt.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-cat-wt',
  templateUrl: './form-cat-wt.component.html',
  styleUrl: './form-cat-wt.component.scss'
})
export class FormCatWtComponent {
  name: string = '';
  description: string = '';

  constructor(
      private toastr: ToastrService,
      private CServiceWT: CategoryWtService,
      public activeModal: NgbActiveModal
  ) {}

  cerrarModal() {
      this.activeModal.close('Modal cerrada');
  }

  addCategory() {
      if (!this.name || !this.description) {
          this.toastr.error('Por favor, completa todos los campos.');
          return;
      }

      const newCategory = {
          name: this.name,
          description: this.description
      };

      this.CServiceWT.saveCategory(newCategory).subscribe(
          () => {
              this.toastr.success('La categoría fue registrada con éxito.', 'Categoría registrada:');
              this.activeModal.close('Modal cerrada');
          },
          (error) => {
              console.error(error);
              this.resetForm();
          }
      );
  }

  resetForm() {
      this.name = '';
      this.description = '';
  }

}
