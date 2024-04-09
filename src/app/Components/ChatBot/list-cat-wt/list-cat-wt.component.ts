import { Component } from '@angular/core';
import { FormCatWtComponent } from '../form-cat-wt/form-cat-wt.component';
import { CategoryWtService } from '../../../services/chatbot/chatbackWT/category-wt.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCatWtComponent } from '../edit-cat-wt/edit-cat-wt.component';

@Component({
  selector: 'app-list-cat-wt',
  templateUrl: './list-cat-wt.component.html',
  styleUrl: './list-cat-wt.component.scss'
})
export class ListCatWtComponent {
  constructor(
    private CaServiceWt: CategoryWtService,
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
    this.CaServiceWt.showCategories().subscribe((lista) => {
      this.listCategory = lista;
      this.filteredCategory = lista;
      this.ordenarLista();
    });
  }

  deleteCategory(id: any) {
    this.CaServiceWt.deleteCategory(id).subscribe(
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
    const modalRef = this.modalService.open(FormCatWtComponent, {
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
    this.CaServiceWt.showCategories().subscribe((lista) => {
      this.listCategory = lista;
      this.filteredCategory = lista;
      this.ordenarLista();
    });
  }

  openEditModal(categoryId: any) {
    const modalRef = this.modalService.open(EditCatWtComponent, {
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
