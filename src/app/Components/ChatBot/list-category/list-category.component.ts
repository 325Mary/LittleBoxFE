import { Component } from '@angular/core';


import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

import { TokenValidationService } from '../../../services/token-validation-service.service';
import { Category } from '../../../Models/category';
import { SCategoryService } from '../../../services/ChatBot/scategory.service';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {
  public searchTerm: string = '';
  public listCategory: Category[] = [];
  public filteredCategory: Category[] = [];

  constructor(
    private categoryService: SCategoryService,
    private modalService: NgbModal,
    private tokenValidationService: TokenValidationService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  filtrarCategory() {
    this.filteredCategory = this.listCategory.filter((categoria: any) =>
      categoria.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  loadCategories() {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      this.categoryService.showCategories(tenantId).subscribe(
        (categories) => {
          this.listCategory = categories;
          this.filteredCategory = categories;
          this.orderList();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteCategory(id: string) {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      this.categoryService.deleteCategory(id, tenantId).subscribe(
        () => {
        
          this.loadCategories();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('No se pudo obtener el ID del inquilino.');
    }
  }

  orderList() {
    this.listCategory.sort((a, b) => a.name.localeCompare(b.name));
  }

  filterCategory() {
    this.filteredCategory = this.listCategory.filter((category) =>
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal() {
    const modalRef = this.modalService.open(FormCategoryComponent, {
      size: 'lg',
    });
    modalRef.result.then(
      () => {
        this.loadCategories();
      },
      (reason) => {
        console.log('Modal cerrada sin guardar cambios.');
      }
    );
  }

  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  openEditModal(categoryId: string | undefined) {
    if (categoryId) {
      const modalRef = this.modalService.open(EditCategoryComponent, {
        size: 'lg',
      });
      modalRef.componentInstance.mode = 'edit';
      modalRef.componentInstance.categoryId = categoryId;
      modalRef.result.then(
        () => {
          this.loadCategories();
        },
        (reason) => {
         console.log(reason);
         
        }
      );
    }
  }

}
