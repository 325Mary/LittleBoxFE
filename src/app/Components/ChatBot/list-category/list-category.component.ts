import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { CategoryService } from '../../../services/chatbot/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent {
  constructor(
    private CaService: CategoryService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal
  ) {}

  //Modal:
  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  public searchTerm: string = '';
  public listCategory: any[] = [];
  public filteredCategory: any[] = [];

  ngOnInit() {
    this.CaService.showCategories().subscribe((lista) => {
      this.listCategory = lista;
      this.filteredCategory = lista;
      this.ordenarLista();
    });
  }

  deleteCategory(id: any) {
    this.CaService.deleteCategory(id).subscribe(
      (data) => {
        this.toastr.error(
          'La categoria fue eliminada con exito.',
          'Categoria eliminada: '
        );
        this.reloadCategories();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ordenarLista() {
    this.listCategory.sort((a, b) => a.referencia - b.referencia);
  }

  filtrarCategory() {
    this.filteredCategory = this.listCategory.filter((categoria: any) =>
      categoria.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal() {
    const modalRef = this.modalService.open(FormCategoryComponent, {
      size: 'lg',
    });
    modalRef.result.then(
      (result) => {
        this.reloadCategories();
      },
      (reason) => {
        console.log('Modal cerrada sin guardar cambios.');
      }
    );
  }

  reloadCategories() {
    this.CaService.showCategories().subscribe((lista) => {
      this.listCategory = lista;
      this.filteredCategory = lista;
      this.ordenarLista();
    });
  }

  openEditModal(categoryId: any) {
    const modalRef = this.modalService.open(EditCategoryComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.mode = 'edit';
    modalRef.componentInstance.categoryId = categoryId;
    modalRef.result.then(
      () => {
        this.reloadCategories();
      },
      (reason) => {
        this.toastr.info(
          'Consulta guardada sin cambios.',
          'Consulta editada: '
        );
      }
    );
  }
}
