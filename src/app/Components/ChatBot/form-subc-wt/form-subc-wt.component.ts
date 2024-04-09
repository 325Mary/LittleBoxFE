import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubcategoryWtService } from '../../../services/chatbot/chatbackWT/subcategory-wt.service';
import { CategoryWtService } from '../../../services/chatbot/chatbackWT/category-wt.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-subc-wt',
  templateUrl: './form-subc-wt.component.html',
  styleUrl: './form-subc-wt.component.scss'
})
export class FormSubcWtComponent {
  @Input() mode: 'create' | 'edit' = 'create';

  name: string = '';
  description: string = ''
  category: string = '';
  categories: any[] = [];

  constructor(
    private toastr: ToastrService,
    private SServiceWt: SubcategoryWtService,
    private CaServiceWt: CategoryWtService,
    public activeModal: NgbActiveModal
  ) {}

  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.CaServiceWt.showCategories().subscribe(
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
      description: this.description,
      category: {
        _id: this.category,
        name: '',
      },
    };

    this.SServiceWt.saveSubcategory(newSubcategory).subscribe(
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
