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

  openModalE(id: string | null) {
    const modalRef = this.modalService.open(FormSubcategoryComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
  }


  public listSubcategory: any[] = [];
  public filteredSubcategory: any[] = [];
  public searchTermReferencia: string = '';

  constructor(private subcategoryService: SubcategoryService, 
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal) { }

  ngOnInit() {
    this.loadSubcategories();
  }

  loadSubcategories(): void {
    this.subcategoryService.showSubcategories().subscribe((lista) => {
      this.listSubcategory = lista;
      this.filteredSubcategory = [...this.listSubcategory]; 
      this.listSubcategory.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    });
  }

  eliminarSubclase(id: any) {
    this.subcategoryService.deleteSubcategories(id).subscribe(
  (data) => {
    this.toastr.error('La subclase fue eliminada con exito.', 'Subclase eliminada: ');
    this.loadSubcategories(); 
  },(error) => {
    console.log(error);
    });
  }
  filtrarSubcategory(): void {
    this.filteredSubcategory = this.listSubcategory.filter(subcategory =>
      subcategory.identifier.toLowerCase().includes(this.searchTermReferencia.toLowerCase()) ||
      subcategory.name.toLowerCase().includes(this.searchTermReferencia.toLowerCase()) ||
      subcategory.category.name.toLowerCase().includes(this.searchTermReferencia.toLowerCase())
    );
  }
}