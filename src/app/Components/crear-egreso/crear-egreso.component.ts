

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal.service';
import { TerceroModalComponent } from '../../Components/modals/tercero-modal/tercero-modal.component';
import { EgresosService } from '../../services/egresos.service';
import { CategoriasService } from '../../services/categoria.service';
import { TercerosService } from '../../services/terceros.service';
import { TokenValidationService } from '../../services/token-validation-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-egreso',
  templateUrl: './crear-egreso.component.html',
  styleUrls: ['./crear-egreso.component.scss'],
})
export class CrearEgresoComponent implements OnInit {
  egresoForm: FormGroup;
  categoria: any[] = [];
    tercero: any[] = [];
    tenantId: string = '';
    showModal: boolean = false;
    fecha: Date | null = null; 
    valor: number | null = null; 
    selectedTercero: string | null = null; 
    selectedCategoria: string | null = null; 
    detalle: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private egresoService: EgresosService,
    private categoriasService: CategoriasService,
    private tercerosService: TercerosService,
    private tokenService: TokenValidationService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private modalService: NgbModal,
    private modalService2: ModalService 
  ) {
    this.egresoForm = this.formBuilder.group({
      selectedCategoria: ['', Validators.required],
      selectedTercero: ['', Validators.required],
      factura: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.egresoForm();
    this.obtenerCategorias();
    this.obtenerTercerosPorTenantId();
    this.getTokenTenantId();
  }
  initegresoForm(): void {
        this.egresoForm = this.formBuilder.group({
          selectedCategoria: ['', Validators.required],
          selectedTercero: ['', Validators.required],
          factura: ['', Validators.required],
        });
      }

  getTokenTenantId(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      if (decodedToken && decodedToken.tenantId) {
        this.tenantId = decodedToken.tenantId;
      }
    }
  }

  guardarEgreso(): void {
    if (this.egresoForm.valid) {
      const formData = new FormData();
      formData.append('categoria', this.egresoForm.value.selectedCategoria);
      formData.append('tercero', this.egresoForm.value.selectedTercero);
      formData.append('factura', this.egresoForm.value.factura);
      
      this.egresoService.saveEgreso(formData).subscribe(
        (response: any) => {
          Swal.fire('Egreso Creado Exitosamente!');
          this.router.navigate(['/listEgresos']);
        },
        (error: any) => {
          console.error('Error al guardar egreso:', error);
          // Maneja el error según tus necesidades, por ejemplo, muestra un mensaje de error al usuario
        }
      );
    } else {
      // Si el formulario no es válido, muestra un mensaje de error o toma alguna acción adicional según tus necesidades
    }
  }

  obtenerCategorias(): void {
    this.categoriasService.obtenerTodasLasCategorias().subscribe(
      (response) => {
        this.categoria = response.data;
        if (this.categoria.length > 0) {
          this.egresoForm.patchValue({ selectedCategoria: this.categoria[0]._id });
        }
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  obtenerTercerosPorTenantId(): void {
    this.tercerosService.obtenerTerceros().subscribe(
      (response: any) => {
        this.tercero = response.data;
        if (this.tercero.length > 0) {
          this.egresoForm.patchValue({ selectedTercero: this.tercero[0]._id });
        }
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    this.egresoForm.patchValue({ factura: selectedFile });
  }

  openModal(): void {
    const modalRef = this.modalService.open(TerceroModalComponent);
  }
}
