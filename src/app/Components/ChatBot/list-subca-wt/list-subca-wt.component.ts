import { Component } from '@angular/core';
import { SubcategoryWtService } from '../../../services/chatbot/chatbackWT/subcategory-wt.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormSubcWtComponent } from '../form-subc-wt/form-subc-wt.component';
import { EditSubcaWtComponent } from '../edit-subca-wt/edit-subca-wt.component';

@Component({
  selector: 'app-list-subca-wt',
  templateUrl: './list-subca-wt.component.html',
  styleUrl: './list-subca-wt.component.scss'
})
export class ListSubcaWtComponent {
    //Modal: 
    cerrarModal() {
      this.activeModal.close('Modal cerrada');
    }
  
    openModal() {
      const modalRef = this.modalService.open(FormSubcWtComponent, { size: 'lg' });
      modalRef.result.then((result) => {
        this.reloadSubcategories();
      }, (reason) => {
        console.log('Modal cerrada sin guardar cambios.');
      });
    }
  
    public listSubcategory: any[] = [];
    public filteredSubcategory: any[] = [];
    public searchTerm: string = '';
  
    constructor(private SService: SubcategoryWtService, 
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
  
    eliminarSubcategory(id: any) {
      this.SService.deleteSubcategories(id).subscribe(
        (data) => {
          this.toastr.error('La subclase fue eliminada con exito.', 'Subclase eliminada: ');
          this.filtrarSubcategory(); 
          this.reloadSubcategories();
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
      this.filteredSubcategory = this.listSubcategory.filter(
          (subcatetegory: any) =>
          subcatetegory.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }
  
    reloadSubcategories() {
      this.SService.showSubcategories().subscribe(lista => {
        this.listSubcategory = lista;
        this.filteredSubcategory = lista;
        this.ordenarLista();
      });
    }
  
    openEditModal(subcategoryId: any) {
      const modalRef = this.modalService.open(EditSubcaWtComponent, { size: 'lg' });
      modalRef.componentInstance.mode = 'edit'; 
      modalRef.componentInstance.subcategoryId = subcategoryId; 
      modalRef.result.then(
          () => {
              this.reloadSubcategories();
          },
          (reason) => {
              this.toastr.info('Subcategoria guardada sin cambios.', 'Subcategoria editada: ')
          }
      );
  }

}
