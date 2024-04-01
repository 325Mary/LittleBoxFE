import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QueriesService } from '../../../services/chatbot/queries.service';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';

@Component({
  selector: 'app-form-queries',
  templateUrl: './form-queries.component.html',
  styleUrls: ['./form-queries.component.scss'],
})
export class FormQueriesComponent implements OnInit {
  
  identifier: string = "";
  question: string = '';
  answer: string = '';
  subcategories: any[] = [];
  subcategory: string = '';

  constructor(
    private toastr: ToastrService,
    private QService: QueriesService,
    public activeModal: NgbActiveModal,
    public SService: SubcategoryService,
  ) {}

  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  ngOnInit(): void {
    this.loadSubcategories();
  }

  loadSubcategories() {
    this.SService.showSubcategories().subscribe(
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
    this.QService.saveQuery(newQuery).subscribe(
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
