import { Component } from '@angular/core';
import { CategoryService } from '../../../services/chatbot/category.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCategoryComponent } from '../form-category/form-category.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {
  constructor (private CaService: CategoryService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal){
      
    }


  //Modal:
  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  openModal() {
    const modalRef = this.modalService.open( FormCategoryComponent, { size: 'lg' });
  }

    
  public searchTerm: string = '';
  public listCategory: any [] = []
  public filteredCategory: any[] = [];


  ngOnInit() {
    this.CaService.showCategories().subscribe(lista => {
      this.listCategory = lista;
      this.filteredCategory = lista;
      this.ordenarLista();
    });
  }
  

  deleteCategory(id:any){
    this.CaService.deleteCategory(id).subscribe(data =>{
      this.toastr.error('La categoria fue eliminada con exito.', 'Categoria eliminada: ')
      
    }, error => {
      console.log(error);
    })
  }

  ordenarLista() {
    this.listCategory.sort((a, b) => a.referencia - b.referencia);
  }

  filtrarCategory() {
    this.filteredCategory = this.listCategory.filter(
      (categoria: any) =>
        categoria.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
}
