import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TokenValidationService } from '../../../services/token-validation-service.service';
import { SQueryService } from '../../../services/ChatBot/squery.service';
import { SSubcategoryService } from '../../../services/ChatBot/ssubcategory.service';


@Component({
  selector: 'app-form-query',
  templateUrl: './form-query.component.html',
  styleUrl: './form-query.component.scss'
})
export class FormQueryComponent {
   
  identifier: string = "";
  question: string = '';
  answer: string = '';
  subcategories: any[] = [];
  subcategory: string = '';
  tenantId: string = ''

  constructor(

    private QService: SQueryService,
    public activeModal: NgbActiveModal,
    public SService: SSubcategoryService,
    private tokenValidationService: TokenValidationService
  ) {this.loadSubcategories();}

  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  ngOnInit(): void {
    
  }

  loadSubcategories() {
   
    const tenantId = this.tokenValidationService.getTenantIdFromToken();
  
   
    if (tenantId) {
      this.SService.showSubcategories(tenantId).subscribe(
        (data: any[]) => {
          this.subcategories = data;
        },
        error => {
          console.error('Error al cargar las categorías:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }
  

  addQuery() {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (!tenantId) {
        console.error('No se pudo obtener el tenantId.');
        return;
    }

    if (!this.question || !this.answer || !this.subcategory) {
        console.log('Por favor, completa todos los campos.');
        return;
    }

    const newQuery = {
        identifier: "",
        question: this.question,
        answer: this.answer,
        subcategory: {
            _id: this.subcategory,  
            name: ''  
        },
        
    };
    
    this.QService.saveQuery(newQuery, tenantId).subscribe(
        () => {
            console.log('La consulta fue registrada con éxito.', 'Consulta registrada:');
            this.activeModal.close('Modal cerrada');
        },
        (error) => {
            console.error('Error al registrar la consulta:', error);
            console.log('Error al registrar la consulta. Por favor, inténtalo de nuevo.', 'Error');
        }
    );
}

}
