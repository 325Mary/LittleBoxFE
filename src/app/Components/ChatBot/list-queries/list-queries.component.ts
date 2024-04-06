import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormQueriesComponent } from '../form-queries/form-queries.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditQueriesComponent } from '../edit-queries/edit-queries.component';
import { QueriesService } from '../../../services/chatbot/queries.service';
import { TokenValidationService } from '../../../services/token-validation-service.service';

@Component({
  selector: 'app-list-queries',
  templateUrl: './list-queries.component.html',
  styleUrls: ['./list-queries.component.scss'],
})
export class ListQueriesComponent {
  constructor(
    private QService: QueriesService,
    private toastr: ToastrService,
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
          this.toastr.error(
            'La consulta fue eliminada con éxito.',
            'Consulta eliminada:'
          );
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
    const modalRef = this.modalService.open(EditQueriesComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.mode = 'edit';
    modalRef.componentInstance.queryId = queryId;
    modalRef.result.then(
      () => {
        this.reloadQueries();
      },
      (reason) => {
        this.toastr.info(
          'Consulta guardada sin cambios.',
          'Consulta editada: '
        );
      }
    );
  }
  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  openModal() {
    const modalRef = this.modalService.open(FormQueriesComponent, {
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
