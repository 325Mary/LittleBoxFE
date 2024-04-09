import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubcategoryWtService } from '../../../services/chatbot/chatbackWT/subcategory-wt.service';
import { CategoryWtService } from '../../../services/chatbot/chatbackWT/category-wt.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-subca-wt',
  templateUrl: './edit-subca-wt.component.html',
  styleUrl: './edit-subca-wt.component.scss'
})
export class EditSubcaWtComponent {
  @Input() mode: 'create' | 'edit' = 'create'; 
  @Input() subcategoryId: string | null = null;


  name: string = '';
  description: string = '';
  category: string = '';
  categories: any[] = [];

  constructor(
      private toastr: ToastrService,
      private SServiceWt: SubcategoryWtService,
      private CaServiceWt: CategoryWtService,
      public activeModal: NgbActiveModal,
  ) {}

  cerrarModal() {
      this.activeModal.close('Modal cerrada');
  }

  ngOnInit(): void {
      if (this.mode === 'edit' && this.subcategoryId) {
          this.loadSubcategoryDetails(this.subcategoryId);
      }
      this.loadCategories();
  }

  loadCategories() {
      this.CaServiceWt.showCategories().subscribe(
          (data: any[]) => {
              this.categories = data;
          },
          error => {
              console.error('Error al cargar las categorías:', error);
          }
      );
  }

  loadSubcategoryDetails(id: string) {
      this.SServiceWt.getASubcategory(id).subscribe(
          (data: any) => {
          
              this.name = data.name;
              this.description = data.description
              this.category = data.category;
          },
          (error) => {
              console.error('Error al cargar los detalles de la subcategoría:', error);
          }
      );
  }

  updateSubcategory() { 
      if ( !this.name || !this.category) {
          this.toastr.error('Por favor, completa todos los campos.');
          return;
      }

      if (this.subcategoryId) {
          const updatedSubcategory = {
              name: this.name,
              description: this.description,
              category: {
                _id: this.category,  
                name: ''  
            }
          };
      
          this.SServiceWt.editSubcategory(this.subcategoryId, updatedSubcategory).subscribe(
              (data) => {
                  this.toastr.info('La subcategoría se ha actualizado con éxito.', 'Se ha actualizado con éxito:');
                  this.activeModal.close('Modal cerrada');
              },
              (error) => {
                  console.error('Error al actualizar la subcategoría:', error);
                  this.toastr.error('Error al actualizar la subcategoría. Por favor, inténtalo de nuevo.', 'Error');
              }
          );
      } else {
          console.error('No se ha proporcionado un ID válido para actualizar la subcategoría.');
      }
  }  


}
