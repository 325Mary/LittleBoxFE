import { Component } from '@angular/core';
import { QueriesService } from '../../../services/chatbot/queries.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-queries',
  templateUrl: './list-queries.component.html',
  styleUrl: './list-queries.component.scss'
})
export class ListQueriesComponent {
  public listQuery: any[] = [];
  public filteredQuery: any[] = [];
  public searchTermReferencia: string = '';

  constructor(private QService: QueriesService, 
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.QService.showQueries().subscribe((lista) => {
        this.listQuery = lista;
        this.ordenarLista();
        this.filtrarQuery();
      });
}

  deleteAQuery(id: any) {
    this.QService.deleteQuery(id).subscribe(
      (data) => {
        this.toastr.error('La consulta fue eliminada con éxito.', 'Consulta eliminada: ');
        this.filtrarQuery(); 
        this.router.navigate(['/'])
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


}
