import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { Ingreso } from '../../../interfaces/ingreso';
import { IngresosService } from '../../../services/ingresos/ingresos.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { TokenValidationService } from '../../../services/token-validation-service.service';

@Component({
  selector: 'app-list-delete-ingresos',
  templateUrl: './list-delete-ingresos.component.html',
  styleUrl: './list-delete-ingresos.component.scss'
})
export class ListDeleteIngresosComponent {

  listIngresos: Ingreso[] = [];
  loading: boolean = false;
  tenantId: string = '';
  id: string | null;

  constructor(
    private ingresosService: IngresosService,
    private sweetAlertService: SweetAlertService,
    private tokenValidationService: TokenValidationService,
    private aRouter: ActivatedRoute,
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const tenantId = this.tokenValidationService.getTenantIdFromToken();
      if (tenantId) {
        this.tenantId = tenantId;
        console.log("este es el tenantid: ", this.tenantId);
        console.log("este es el token: ", token);
        
      } else {
        console.error('No se pudo obtener el tenant ID del token');
      }
    } else {
      console.error('No se encontró ningún token en el almacenamiento local');
    }
    this.getListIngresos();
  }

  getListIngresos(): void {
    // this.loading = true;
    this.ingresosService
      .getListaIngresos(this.tenantId)
      .subscribe((data: any) => {
        console.log("estas son los egresos: ",data);
        this.listIngresos = [...data.data];
        // this.loading = false;
        console.log("Datos de los ingresos: ",this.listIngresos);
      });
  }

  deleteIngreso(id: any) {
    if (id) {
      this.sweetAlertService.showConfirmationDelete().then((result) => {
        if (result.isConfirmed) {
          // this.loading = true;
          this.ingresosService
            .deleteIngreso(id, this.tenantId)
            .subscribe(() => {
              this.sweetAlertService.showDeleteAlert(
                'Ingreso eliminado con exito.',
              );
              this.getListIngresos();
            });
        }
      });
    } else {
      console.log('no funciona');
    }
  }

}
