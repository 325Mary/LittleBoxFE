import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormSubcategoryComponent } from '../form-subcategory/form-subcategory.component';
import { EditSubcategoryComponent } from '../edit-subcategory/edit-subcategory.component';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';

@Component({
  selector: 'app-list-subcategory',
  templateUrl: './list-subcategory.component.html',
  styleUrls: ['./list-subcategory.component.scss']
})
export class ListSubcategoryComponent {

  //Modal: 
  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  openModal() {
    const modalRef = this.modalService.open(FormSubcategoryComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      this.reloadSubcategories();
    }, (reason) => {
      console.log('Modal cerrada sin guardar cambios.');
    });
  }

  public listSubcategory: any[] = [];
  public filteredSubcategory: any[] = [];
  public searchTerm: string = '';

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
    const modalRef = this.modalService.open(EditSubcategoryComponent, { size: 'lg' });
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

