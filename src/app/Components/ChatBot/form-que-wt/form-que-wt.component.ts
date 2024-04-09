import { Component } from '@angular/core';
import { QuerywtService } from '../../../services/chatbot/chatbackWT/querywt.service';
import { SubcategoryWtService } from '../../../services/chatbot/chatbackWT/subcategory-wt.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-que-wt',
  templateUrl: './form-que-wt.component.html',
  styleUrl: './form-que-wt.component.scss'
})
export class FormQueWtComponent {
  identifier: string = "";
  question: string = '';
  answer: string = '';
  subcategories: any[] = [];
  subcategory: string = '';

  constructor(
    private toastr: ToastrService,
    private QServiceWt: QuerywtService,
    public activeModal: NgbActiveModal,
    public SServiceWt: SubcategoryWtService,
  ) {}

  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  ngOnInit(): void {
    this.loadSubcategories();
  }

  loadSubcategories() {
    this.SServiceWt.showSubcategories().subscribe(
      (data: any[]) => {
        this.subcategories = data;
      },
      error => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  addQuery() {
    if (!this.question || !this.answer || !this.subcategory) {
      this.toastr.error('Por favor, completa todos los campos.');
      return;
    }

    const newQuery = {
      identifier: "",
      question: this.question,
      answer: this.answer,
      subcategory: {
        _id: this.subcategory,  
        name: ''  
      }
    };
    this.QServiceWt.saveQuery(newQuery).subscribe(
      () => {
        this.toastr.success('La consulta fue registrada con éxito.', 'Consulta registrada:');
        this.activeModal.close('Modal cerrada');
      },
      (error) => {
        console.error('Error al registrar la consulta:', error);
        this.toastr.error('Error al registrar la consulta. Por favor, inténtalo de nuevo.', 'Error');
      }
    );
  }

}
