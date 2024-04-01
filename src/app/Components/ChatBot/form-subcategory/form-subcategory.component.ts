import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { CategoryService } from '../../../services/chatbot/category.service';

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
    public activeModal: NgbActiveModal
  ) {}

  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.CaService.showCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
        
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  addSubcategory() {
    if ( !this.name || !this.category) {
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

    this.SService.saveSubcategory(newSubcategory).subscribe(
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
  }
}
