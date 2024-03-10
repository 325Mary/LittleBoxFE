import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormSubcategoryComponent } from '../form-subcategory/form-subcategory.component';


@Component({
  selector: 'app-list-subcategory',
  templateUrl: './list-subcategory.component.html',
  styleUrl: './list-subcategory.component.scss'
})
export class ListSubcategoryComponent {

  //Modal: 
  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  openModal() {
    const modalRef = this.modalService.open( FormSubcategoryComponent, { size: 'lg' });
  }

  


  public listSubcategory: any[] = [];
  public filteredSubcategory: any[] = [];
  public searchTermReferencia: string = '';

  constructor(private SService: SubcategoryService, 
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public modalService: NgbModal) { }

  ngOnInit() {
    this.SService.showSubcategories().subscribe((lista) => {
      this.listSubcategory = lista;
      this.filtrarSubcategory(); 
      this.ordenarLista();
    });
  }

  eliminarSubclase(id: any) {
    this.SService.deleteSubcategories(id).subscribe(
      (data) => {
        this.toastr.error('La subclase fue eliminada con exito.', 'Subclase eliminada: ');
        this.filtrarSubcategory(); 
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ordenarLista() {
    this.listSubcategory.sort((a, b) => a.referencia - b.referencia);
  }

  filtrarSubcategory() {
   
    if (this.searchTermReferencia) {
      this.filteredSubcategory = this.listSubcategory.filter(subcategory =>
        subcategory.referencia.toString().includes(this.searchTermReferencia)
      );
    } else {
      this.filteredSubcategory = [...this.listSubcategory]; 
    }
  }

}
