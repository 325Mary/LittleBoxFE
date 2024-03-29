import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../services/chatbot/category.service';


@Component({
    selector: 'app-form-category',
    templateUrl: './form-category.component.html',
    styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent {
    
    name: string = '';
    description: string = '';

    constructor(
        private toastr: ToastrService,
        private categoryService: CategoryService,
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

        this.categoryService.saveCategory(newCategory).subscribe(
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
