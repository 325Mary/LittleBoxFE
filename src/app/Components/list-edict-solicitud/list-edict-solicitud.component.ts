import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from '../../interfaces/solicitud';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { TokenValidationService } from '../../services/token-validation-service.service';

@Component({
  selector: 'app-list-edict-solicitud',
  templateUrl: './list-edict-solicitud.component.html',
  styleUrl: './list-edict-solicitud.component.scss',
})
export class ListEdictSolicitudComponent {
  listSolicitudes: Solicitud[] = [];
  loading: boolean = false;
  tenantId: string = '';
  constructor(
    private solicitudesService: SolicitudesService,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private tokenValidationService: TokenValidationService,
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const tenantId = this.tokenValidationService.getTenantIdFromToken();
      if (tenantId) {
        this.tenantId = tenantId;
      } else {
        console.error('No se pudo obtener el tenant ID del token');
      }
    } else {
      console.error('No se encontró ningún token en el almacenamiento local');
    }
    this.getListSolicitudes();
  }

  getListSolicitudes(): void {
    // this.loading = true;
    this.solicitudesService
      .getListaSolicitudes(this.tenantId)
      .subscribe((data: any) => {
        console.log(data);
        this.listSolicitudes = [...data.data];
        // this.loading = false;
        console.log(this.listSolicitudes);
      });
  }
  deleteSolicitud(id: any) {
    if (id) {
      this.sweetAlertService.showConfirmationDelete().then((result) => {
        if (result.isConfirmed) {
          // this.loading = true;
          this.solicitudesService
            .deleteSolicitud(id, this.tenantId)
            .subscribe(() => {
              this.sweetAlertService.showDeleteAlert(
                'Egreso eliminado con exito.',
              );
              this.getListSolicitudes();
            });
        }
      });
    } else {
      console.log('no funciona');
    }
  }
}
