import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { CategoryService } from '../../../services/chatbot/category.service';
import { TokenValidationService } from '../../../services/token-validation-service.service';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.scss'],
})
export class EditSubcategoryComponent {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() subcategoryId: string | null = null;

  name: string = '';
  category: string = '';
  categories: any[] = [];

  constructor(
    private toastr: ToastrService,
    private SService: SubcategoryService,
    private CaService: CategoryService,
    public activeModal: NgbActiveModal,
    private tokenValidationService: TokenValidationService
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
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      this.CaService.showCategories(tenantId).subscribe(
        (data: any[]) => {
          this.categories = data;
        },
        (error) => {
          console.error('Error al cargar las categorías:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }

  loadSubcategoryDetails(id: string) {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      this.SService.getASubcategory(id, tenantId).subscribe(
        (data: any) => {
          this.name = data.name;
          this.category = data.category;
        },
        (error) => {
          console.error(
            'Error al cargar los detalles de la subcategoría:',
            error
          );
        }
      );
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }

  updateSubcategory() {
    if (!this.name || !this.category) {
      this.toastr.error('Por favor, completa todos los campos.');
      return;
    }
    const tenantId = this.tokenValidationService.getTenantIdFromToken();
    if (!tenantId) {
      console.error('No se pudo obtener el tenantId.');
      return;
    }

    if (this.subcategoryId) {
      const updatedSubcategory = {
        name: this.name,
        category: {
          _id: this.category,
          name: '',
        },
      };

      this.SService.editSubcategory(
        this.subcategoryId,
        updatedSubcategory, tenantId
      ).subscribe(
        (data) => {
          this.toastr.info(
            'La subcategoría se ha actualizado con éxito.',
            'Se ha actualizado con éxito:'
          );
          this.activeModal.close('Modal cerrada');
        },
        (error) => {
          console.error('Error al actualizar la subcategoría:', error);
          this.toastr.error(
            'Error al actualizar la subcategoría. Por favor, inténtalo de nuevo.',
            'Error'
          );
        }
      );
    } else {
      console.error(
        'No se ha proporcionado un ID válido para actualizar la subcategoría.'
      );
    }
  }
}
