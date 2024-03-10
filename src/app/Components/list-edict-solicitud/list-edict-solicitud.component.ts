import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { Solicitud } from '../../interfaces/solicitud';
import { SolicitudesService } from '../../services/solicitudes.service';
import { EstadoSolicitud } from '../../interfaces/estadoSolicitud';
import { EstadoSolicitudService } from '../../services/estado-solicitud.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { TokenValidationService } from '../../services/token-validation-service.service';


@Component({
  selector: 'app-list-edict-solicitud',
  templateUrl: './list-edict-solicitud.component.html',
  styleUrl: './list-edict-solicitud.component.scss',
})
export class ListEdictSolicitudComponent {
  listSolicitudes: Solicitud[] = [];
  estadoDeSolicitud: EstadoSolicitud[] = [];
  estadoSeleccionado: string | null = null;
  solicitudesSeleccionadas: string[] = [];
  loading: boolean = false;
  tenantId: string = '';
  id: string | null;
  constructor(
    private solicitudesService: SolicitudesService,
    private sweetAlertService: SweetAlertService,
    private tokenValidationService: TokenValidationService,
    private estadoSolicitud: EstadoSolicitudService,
    private aRouter: ActivatedRoute,
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getEstadoSolicitud();
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
    this.getListSolicitudes();
  }

  getEstadoSolicitud(): void {
    this.estadoSolicitud.getListaEstadoSolicitudes().subscribe((Data: any) => {
      this.estadoDeSolicitud = [...Data.data];
    });
  }

  getListSolicitudes(): void {
    // this.loading = true;
    this.solicitudesService
      .getListaSolicitudes(this.tenantId)
      .subscribe((data: any) => {
        console.log("estas son las solicitudes: ",data);
        this.listSolicitudes = [...data.data];
        // this.loading = false;
        console.log("Datos de las solicitudes: ",this.listSolicitudes);
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
                'Solicitud eliminada con exito.',
              );
              this.getListSolicitudes();
            });
        }
      });
    } else {
      console.log('no funciona');
    }
  }

  // guardarCambiosEstado() {
  //   if (this.estadoSeleccionado !== null && this.solicitudesSeleccionadas.length > 0) {
  //     this.solicitudesSeleccionadas.forEach((solicitudId) => {
  //       console.log("solicitudId de guardarcambiosestado: ", solicitudId);
        
  //       if (solicitudId) { // Verificar que solicitudId no sea null o undefined
  //         console.log("Este es el estado seleccionado:", this.estadoSeleccionado);
  //         this.solicitudesService.updateEstadoSolicitud(solicitudId, this.estadoSeleccionado!, this.tenantId)        
  //           .subscribe(() => {
  //             console.log(`Estado de la solicitud ${solicitudId} cambiado correctamente.`);
  //             // Aquí podrías agregar lógica adicional si lo necesitas, como actualizar la lista de solicitudes
  //           }, (error) => {
  //             console.error(`Error al cambiar el estado de la solicitud ${solicitudId}:`, error);
  //           });
  //       } else {
  //         console.warn(`El id de la solicitud es ${solicitudId}, no se puede cambiar el estado.`);
  //       }
  //     });
  //   } else {
  //     console.log('Por favor selecciona al menos una solicitud y un nuevo estado.');
  //   }
  // }
  guardarCambiosEstado() {
    if (this.estadoSeleccionado !== null && this.solicitudesSeleccionadas.length > 0) {
      const solicitudesIds = this.solicitudesSeleccionadas; // Solo los IDs de las solicitudes
      const nuevoEstadoId = this.estadoSeleccionado;
      const tenantId = this.tenantId;

      console.log("etas son las solicitudes por parmetros: ", solicitudesIds);
  console.log("este es el nuevo estado pasado por parametro: ", nuevoEstadoId);
  console.log("este es el tenantId: ", tenantId);
  
      this.solicitudesService.updateEstadoSolicitud(solicitudesIds, nuevoEstadoId, tenantId)
        .subscribe(() => {
          console.log(`Estado de las solicitudes actualizado correctamente.`);
          // Aquí podrías agregar lógica adicional si lo necesitas, como actualizar la lista de solicitudes
          this.sweetAlertService.showSuccessAlert(
            'Estado modificado exitosamente.',
          );
        }, (error) => {
          console.error(`Error al cambiar el estado de las solicitudes:`, error);
          const mensaje = `Error al cambiar el estado de las solicitudes:`+error.error.data
          this.sweetAlertService.showErrorAlert(mensaje)
        });
    } else {
      console.log('Por favor selecciona al menos una solicitud y un nuevo estado.');
    }
  }
  
  
  
  seleccionarSolicitud(solicitudId: string) {
    console.log("Este es la solicitudId de seleccionar solicitud: ",solicitudId);
    
    if (this.solicitudesSeleccionadas.includes(solicitudId)) {
      this.solicitudesSeleccionadas = this.solicitudesSeleccionadas.filter(id => id !== solicitudId);
      console.log("estas son las solicitudes seleccionadas check: ",this.solicitudesSeleccionadas);
      
    } else {
      this.solicitudesSeleccionadas.push(solicitudId);
      console.log("solicitud push a array: ",this.solicitudesSeleccionadas);
    }
  }
}
