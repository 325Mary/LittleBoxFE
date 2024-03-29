import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormQueriesComponent } from '../form-queries/form-queries.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditQueriesComponent } from '../edit-queries/edit-queries.component';
import { QueriesService } from '../../../services/chatbot/queries.service';

@Component({
  selector: 'app-list-queries',
  templateUrl: './list-queries.component.html',
  styleUrls: ['./list-queries.component.scss']
})
export class ListQueriesComponent {

  constructor(private QService: QueriesService, 
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public modalService: NgbModal) { }

  public listQuery: any[] = [];
  public filteredQuery: any[] = [];
  public searchTermReferencia: string = '';

  ngOnInit() {
    this.loadQueries();
  }

  loadQueries() {
    this.QService.showQueries().subscribe((lista) => {
      this.listQuery = lista;
      this.filtrarQuery(); 
      this.ordenarLista();
    });
  }

  eliminarQuery(id: any) {
    this.QService.deleteQuery(id).subscribe(
      (data) => {
        this.toastr.error('La subclase fue eliminada con exito.', 'Subclase eliminada: ');
        this.filtrarQuery(); 
        this.reloadQueries();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ordenarLista() {
    this.listQuery.sort((a, b) => a.referencia - b.referencia);
  }

  filtrarQuery() {
    if (this.searchTermReferencia) {
      this.filteredQuery = this.listQuery.filter(query =>
        query.referencia.toString().includes(this.searchTermReferencia)
      );
    } else {
      this.filteredQuery = [...this.listQuery]; 
    }
  }

  reloadQueries() {
    this.QService.showQueries().subscribe(lista => {
      this.listQuery = lista;
      this.filteredQuery = lista;
      this.ordenarLista();
    });
  }

  openEditModal(queryId: any) {
    const modalRef = this.modalService.open(EditQueriesComponent, { size: 'lg' });
    modalRef.componentInstance.mode = 'edit'; 
    modalRef.componentInstance.queryId = queryId; 
    modalRef.result.then(
        () => {
            this.reloadQueries();
        },
        (reason) => {
            this.toastr.info('Consulta guardada sin cambios.', 'Consulta editada: ')
        }
    );
  }
  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  openModal() {
    const modalRef = this.modalService.open(FormQueriesComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      this.reloadQueries();
    }, (reason) => {
      console.log('Modal cerrada sin guardar cambios.');
    });
  }

}
