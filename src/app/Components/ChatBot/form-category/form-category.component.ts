import { Component, Input } from '@angular/core';


import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { JwtHelperService } from '@auth0/angular-jwt';
import { SCategoryService } from '../../../services/ChatBot/scategory.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrl: './form-category.component.scss'
})
export class FormCategoryComponent {

  identifier: string = ''
  name: string = '';
  description: string = '';
  tenantId: string = '';

  constructor(

    private categoryService: SCategoryService,
    public activeModal: NgbActiveModal,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token !== null) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      this.tenantId = decodedToken.tenantId;
    } else {
      console.error('No se encontró ningún token en el almacenamiento local.');
    }
  }

  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  addCategory() {
    if (!this.tenantId) {
      console.error('No se pudo obtener el tenantId.');
      return;
    }

    if (!this.name || !this.description) {
      console.error('Por favor, completa todos los campos.');
      return;
    }

    const newCategory = {
      identifier: this.identifier,
      name: this.name,
      description: this.description,
      tenant: this.tenantId,
    };

    this.categoryService.saveCategory(newCategory, this.tenantId).subscribe(
      () => {
        console.error(
          'La categoría fue registrada con éxito.',
          'Categoría registrada:'
        );
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
