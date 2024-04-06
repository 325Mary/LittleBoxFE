import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../services/chatbot/category.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
    selector: 'app-form-category',
    templateUrl: './form-category.component.html',
    styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent {
    
    name: string = '';
    description: string = '';
    tenantId: string = '';

    constructor(
        private toastr: ToastrService,
        private categoryService: CategoryService,
        public activeModal: NgbActiveModal,
        private jwtHelper: JwtHelperService ,
    ) {
       
    }

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
            this.toastr.error('Por favor, completa todos los campos.');
            return;
        }

        const newCategory = {
            name: this.name,
            description: this.description,
            tenant: this.tenantId
        };

        this.categoryService.saveCategory(newCategory, this.tenantId).subscribe(
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
