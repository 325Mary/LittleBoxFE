import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/chatbot/category.service';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {
  @Input() categoryId: string | null = null;

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

    ngOnInit(): void {
        if (this.categoryId) {
            this.loadCategoryDetails(this.categoryId);
        }
    }

    loadCategoryDetails(id: string) {
        this.categoryService.getACategory(id).subscribe(
            (data: any) => {
                this.name = data.name;
                this.description = data.description;
            },
            (error) => {
                console.error('Error al cargar los detalles de la categoría:', error);
            }
        );
    }

    updateCategory() {
        if (!this.name || !this.description) {
            this.toastr.error('Por favor, completa todos los campos.');
            return;
        }

        if (this.categoryId) {
            const updatedCategory = {
                name: this.name,
                description: this.description
            };

            this.categoryService.editCategory(this.categoryId, updatedCategory).subscribe(
                () => {
                    this.toastr.info('La categoría se ha actualizado con éxito.', 'Se ha actualizado con éxito:');
                    this.activeModal.close('Modal cerrada');
                },
                (error) => {
                    console.error('Error al actualizar la categoría:', error);
                    this.toastr.error('Error al actualizar la categoría. Por favor, inténtalo de nuevo.', 'Error');
                }
            );
        } else {
            console.error('No se ha proporcionado un ID válido para actualizar la categoría.');
        }
    }

}
