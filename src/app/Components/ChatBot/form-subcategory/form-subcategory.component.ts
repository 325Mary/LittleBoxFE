import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { CategoryService } from '../../../services/chatbot/category.service';
import { TokenValidationService } from '../../../services/token-validation-service.service';

@Component({
  selector: 'app-form-subcategory',
  templateUrl: './form-subcategory.component.html',
  styleUrls: ['./form-subcategory.component.scss'],
})
export class FormSubcategoryComponent {
  @Input() mode: 'create' | 'edit' = 'create';

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
    this.loadCategories();
  }

  loadCategories() {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      this.CaService.showCategories(tenantId).subscribe((data: any[]) => {
        this.categories = data;
      });
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }

  addSubcategory() {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      if (!this.name || !this.category) {
        this.toastr.error('Por favor, completa todos los campos.');
        return;
      }

      const newSubcategory = {
        name: this.name,
        category: {
          _id: this.category,
          name: '',
        },
      };

      this.SService.saveSubcategory(newSubcategory, tenantId).subscribe(
        () => {
          this.toastr.success(
            'La subcategoría fue registrada con éxito.',
            'Subcategoría registrada:'
          );
          this.activeModal.close('Modal cerrada');
        },
        (error) => {
          console.error('Error al registrar la subcategoría:', error);
          this.toastr.error(
            'Error al registrar la subcategoría. Por favor, inténtalo de nuevo.',
            'Error'
          );
          this.activeModal.close('Modal cerrada');
        }
      );
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }
}
