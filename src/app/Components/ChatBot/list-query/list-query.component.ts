import { Component } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TokenValidationService } from '../../../services/token-validation-service.service';
import { SQueryService } from '../../../services/ChatBot/squery.service';
import { EditQueryComponent } from '../edit-query/edit-query.component';
import { FormQueryComponent } from '../form-query/form-query.component';

@Component({
  selector: 'app-list-query',
  templateUrl: './list-query.component.html',
  styleUrl: './list-query.component.scss'
})
export class ListQueryComponent {
  constructor(
    private QService: SQueryService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private tokenValidationService: TokenValidationService
  ) {}

  public listQuery: any[] = [];
  public filteredQuery: any[] = [];
  public searchTermReferencia: string = '';

  ngOnInit() {
    this.loadQueries();
  }

  loadQueries() {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      this.QService.showQueries(tenantId).subscribe((lista) => {
        this.listQuery = lista;
        this.filtrarQuery();
        this.ordenarLista();
      });
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }

  eliminarQuery(id: any) {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      this.QService.deleteQuery(id, tenantId).subscribe(
        (data) => {
         
          this.loadQueries();
        },
        (error) => {
          console.error('Error al eliminar la consulta:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }

  ordenarLista() {
    this.listQuery.sort((a, b) => a.referencia - b.referencia);
  }

  filtrarQuery() {
    if (this.searchTermReferencia) {
      this.filteredQuery = this.listQuery.filter((query) =>
        query.referencia.toString().includes(this.searchTermReferencia)
      );
    } else {
      this.filteredQuery = [...this.listQuery];
    }
  }

  reloadQueries() {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      this.QService.showQueries(tenantId).subscribe((lista) => {
        this.listQuery = lista;
        this.filteredQuery = lista;
      });
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }

  openEditModal(queryId: any) {
    const modalRef = this.modalService.open(EditQueryComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.mode = 'edit';
    modalRef.componentInstance.queryId = queryId;
    modalRef.result.then(
      () => {
        this.reloadQueries();
      },
      (reason) => {
        console.log(reason);
        
      }
    );
  }
  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  openModal() {
    const modalRef = this.modalService.open(FormQueryComponent, {
      size: 'lg',
    });
    modalRef.result.then(
      (result) => {
        this.reloadQueries();
      },
      (reason) => {
        console.log('Modal cerrada sin guardar cambios.');
      }
    );
  }

}
