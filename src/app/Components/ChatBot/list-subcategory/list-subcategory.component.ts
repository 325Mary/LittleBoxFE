import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormSubcategoryComponent } from '../form-subcategory/form-subcategory.component';
import { EditSubcategoryComponent } from '../edit-subcategory/edit-subcategory.component';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { TokenValidationService } from '../../../services/token-validation-service.service';
import { SignInUpService } from '../../../services/sign-in-up.service';

@Component({
  selector: 'app-list-subcategory',
  templateUrl: './list-subcategory.component.html',
  styleUrls: ['./list-subcategory.component.scss'],
})
export class ListSubcategoryComponent {
  //Modal:
  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  openModal() {
    const modalRef = this.modalService.open(FormSubcategoryComponent, {
      size: 'lg',
    });
    modalRef.result.then(
      (result) => {
        this.reloadSubcategories();
      },
      (reason) => {
        console.log('Modal cerrada sin guardar cambios.');
      }
    );
  }

  rolUsuario: string = '';
  public listSubcategory: any[] = [];
  public filteredSubcategory: any[] = [];
  public searchTerm: string = '';

  constructor(
    private SService: SubcategoryService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private tokenValidationService: TokenValidationService,
    private authService: SignInUpService
  ) { this.getRolUser()}

  ngOnInit() {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      this.SService.showSubcategories(tenantId).subscribe((lista) => {
        this.listSubcategory = lista;
        this.filtrarSubcategory();
        this.ordenarLista();
      });
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }

  getRolUser(): void {
    const userRol = this.authService.getUserRole();
    if (userRol !== null) {
      this.rolUsuario = userRol;
      console.log('Rol del usuario', this.rolUsuario);
    } else {
      console.error('No se puedo obtener el rol de usuario');
    }
  }

  eliminarSubcategory(id: any) {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "¿Estas seguro?",
        text: "Estas seguro de borrar esta subcategoria!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar!",
        cancelButtonText: "Cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "La subcategoria se ha eliminado con exito.",
            icon: "success"
          });
          this.SService.deleteSubcategories(id, tenantId).subscribe((data) => {
            this.filtrarSubcategory();
            this.reloadSubcategories();
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelada",
            text: "La subcategoria se ha salvado :)",
            icon: "error"
          });
        }
      });
      
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
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
    const tenantId = this.tokenValidationService.getTenantIdFromToken();
    if (tenantId) {
      this.SService.showSubcategories(tenantId).subscribe((lista) => {
        this.listSubcategory = lista;
        this.filteredSubcategory = lista;
        this.ordenarLista();
      });
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }

  openEditModal(subcategoryId: any) {
    const modalRef = this.modalService.open(EditSubcategoryComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.mode = 'edit';
    modalRef.componentInstance.subcategoryId = subcategoryId;
    modalRef.result.then(
      () => {
        this.reloadSubcategories();
      },
      (reason) => {
        this.toastr.info(
          'Subcategoria guardada sin cambios.',
          'Subcategoria editada: '
        );
      }
    );
  }
}
