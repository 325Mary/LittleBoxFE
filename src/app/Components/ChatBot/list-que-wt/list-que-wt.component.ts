import { Component } from '@angular/core';
import { FormQueWtComponent } from '../form-que-wt/form-que-wt.component';
import { QuerywtService } from '../../../services/chatbot/chatbackWT/querywt.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditQueriesComponent } from '../edit-queries/edit-queries.component';

@Component({
  selector: 'app-list-que-wt',
  templateUrl: './list-que-wt.component.html',
  styleUrl: './list-que-wt.component.scss'
})
export class ListQueWtComponent {
  constructor(
    private QServiceWt: QuerywtService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal
  ) {}

  public listQuery: any[] = [];
  public filteredQuery: any[] = [];
  public searchTermReferencia: string = '';

  ngOnInit() {
    this.loadQueries();
  }

  loadQueries() {
    this.QServiceWt.showQueries().subscribe((lista) => {
      this.listQuery = lista;
      this.filtrarQuery();
      this.ordenarLista();
    });
  }

  eliminarQuery(id: any) {
    this.QServiceWt.deleteQuery(id).subscribe(
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
    this.QServiceWt.showQueries().subscribe((lista) => {
      this.listQuery = lista;
      this.filteredQuery = lista;
      this.ordenarLista();
    });
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
    const modalRef = this.modalService.open(FormQueWtComponent, {
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
