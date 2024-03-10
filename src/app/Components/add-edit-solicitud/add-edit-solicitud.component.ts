import { Component } from '@angular/core';
import { Solicitud } from '../../interfaces/solicitud';
import { Categoria } from '../../interfaces/categoria';
import { Tercero } from '../../interfaces/tercero';
import { EstadoSolicitud } from '../../interfaces/estadoSolicitud';
import { SolicitudesService } from '../../services/solicitudes.service';
import { CategoriasService } from '../../services/categorias.service';
import { TercerosService } from '../../services/terceros.service';
import { EstadoSolicitudService } from '../../services/estado-solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { TokenValidationService } from '../../services/token-validation-service.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-add-edit-solicitud',
  templateUrl: './add-edit-solicitud.component.html',
  styleUrls: ['./add-edit-solicitud.component.scss'],
})
export class AddEditSolicitudComponent {
  loading: boolean = false;
  id: string | null;
  operacion: string = 'Agregar ';
  categorias: Categoria[] = [];
  terceros: Tercero[] = [];
  estadoSolicitud: EstadoSolicitud[] = [];
  tenantId: string = '';

  showModal: boolean = false;
  isImage: boolean = false;
  isPdf: boolean = false;

  selectedCategoriaId: string = '';
  selectedTerceroId: string = '';
  facturaSeleccionada: File | null = null;

  extension: string = '';

  formulario: Solicitud = {
    solicitudId: 0,
    tenantId: '',
    tercero: null,
    fecha: new Date(),
    detalle: '',
    categoria: null,
    valor: 0,
    estado: { _id: '65d6a34bc04706dd1cdafd6c', nombre: 'pendiente' }, // Valor por defecto para el estado
    facturaUrl: '',
  };

  constructor(
    private solicitudesService: SolicitudesService,
    private categoriasService: CategoriasService,
    private tercerosService: TercerosService,
    private estadoSolicitudesService: EstadoSolicitudService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private tokenValidationService: TokenValidationService,
    private sweetAlertService: SweetAlertService,
    private modalService:ModalService,
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
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
    console.log(this.tenantId);
  }

  // onFileSelected(event: any) {
  //   this.facturaSeleccionada = event.target.files[0];
  //   if (this.facturaSeleccionada) {
  //     const solicId = this.id ?? ''; // Si this.id es null, asigna un valor predeterminado de cadena vacía
  //     this.solicitudesService.uploadFactura(this.facturaSeleccionada, solicId).subscribe(
  //       (response: any) => {
  //         this.formulario.facturaUrl = response.url;
  //         // Llama a la función para realizar la actualización después de cargar la URL de la factura
  //         this.realizarActualizacion();
  //       },
  //       (error) => {
  //         console.error('Error al subir el archivo:', error);
  //         // Manejar el error apropiadamente, por ejemplo, mostrar un mensaje al usuario
  //       }
  //     );
  //   }
  // }

  // onFileSelected(event: any) {
  //   this.facturaSeleccionada = event.target.files[0];
  // }

  // onFileSelected(event: any) {
  //   console.log("Evento de cambio:", event);
  //   this.facturaSeleccionada = event.target.files[0];
  //   // Verificar si facturaSeleccionada no es nulo
  //   console.log("Esta es la factura seleccionada: ", this.facturaSeleccionada);

  //   if (this.facturaSeleccionada) {
  //     // Obtener la extensión del archivo
  //     const extension = this.facturaSeleccionada.name.split('.').pop()?.toLowerCase();
  //     // Asignar la URL del archivo seleccionado a formulario.facturaUrl
  //     this.formulario.facturaUrl = URL.createObjectURL(this.facturaSeleccionada);
  //     console.log("onfileselected url ", this.formulario.facturaUrl);
  //     console.log("Extension:", extension);

  //     // Abrir el modal de factura
  //     this.openFacturaModal();
  //   }
  // }

  // openFacturaModal() {
  //   console.log("Abriendo modal de factura");
  //   this.showModal = true;

  //   // Verificar si la facturaUrl está definida y no es nula
  //   if (this.formulario.facturaUrl) {
  //     console.log("URL de la factura:", this.formulario.facturaUrl);
  //     if (this.facturaSeleccionada) {
  //       // Verificar si la factura es una imagen o PDF
  //       const fileType = this.facturaSeleccionada.type;
  //       this.isImage = fileType.startsWith('image/');
  //       this.isPdf = fileType === 'application/pdf';

  //       console.log("Es una imagen:", this.isImage);
  //       console.log("Es un PDF:", this.isPdf);
  //     } else {
  //       // Factura seleccionada es nula
  //       console.log("No se ha seleccionado ninguna factura.");
  //     }
  //   } else {
  //     // Si la facturaUrl no está definida, establecer isImage y isPdf como false
  //     this.isImage = false;
  //     this.isPdf = false;
  //     console.log("No se ha adjuntado ninguna factura");
  //   }
  // }

  onFileSelected(event: any) {
    console.log("Evento de cambio:", event);
    this.facturaSeleccionada = event.target.files[0];
    // Verificar si facturaSeleccionada no es nulo
    console.log("Esta es la factura seleccionada: ", this.facturaSeleccionada);

    if (this.facturaSeleccionada) {
      // Obtener la extensión del archivo
      const extension = this.facturaSeleccionada.name.split('.').pop()?.toLowerCase();
      // Asignar la URL del archivo seleccionado a formulario.facturaUrl
      const facturaUrl = URL.createObjectURL(this.facturaSeleccionada);
      console.log("onfileselected url ", facturaUrl);
      console.log("Extension:", extension);

      // Emitir la factura seleccionada al servicio modal
      this.modalService.enviarFacturaSeleccionada(this.facturaSeleccionada);
    }
  }

  // onFileSelected(event: any) {
  //   this.facturaSeleccionada = event.target.files[0];
  //   // Verificar si facturaSeleccionada no es nulo
  //   console.log("Esta es la factura seleccionada: ", this.facturaSeleccionada);
  
  //   if (this.facturaSeleccionada) {
  //     // Obtener la extensión del archivo
  //     const extension = this.facturaSeleccionada.name.split('.').pop()?.toLowerCase();
  //     // Asignar la URL del archivo seleccionado a formulario.facturaUrl
  //     this.formulario.facturaUrl = URL.createObjectURL(this.facturaSeleccionada);
  //     // Asignar la URL del archivo a la propiedad facturaUrl del formulario
  //     this.formulario.facturaUrl = this.formulario.facturaUrl;
  //     console.log("onfileselected url ", this.formulario.facturaUrl);
  //     console.log("Extension:", extension);
  
  //     // Abrir el modal de factura
  //     this.openFacturaModal();
  //   }
  // }
  

  openFacturaModal() {
    console.log("Abriendo modal de factura");
    this.showModal = true;

    // Verificar si la facturaUrl está definida y no es nula
    if (this.formulario.facturaUrl) {
      console.log("URL de la factura:", this.formulario.facturaUrl);
      if (this.facturaSeleccionada) {
        // Verificar si la factura es una imagen o PDF
        const fileType = this.facturaSeleccionada.type;
        this.isImage = fileType.startsWith('image/');
        this.isPdf = fileType === 'application/pdf';

        console.log("Es una imagen:", this.isImage);
        console.log("Es un PDF:", this.isPdf);
      } else {
        // Factura seleccionada es nula
        console.log("No se ha seleccionado ninguna factura.");
      }
    } else {
      // Si la facturaUrl no está definida, establecer isImage y isPdf como false
      this.isImage = false;
      this.isPdf = false;
      console.log("No se ha adjuntado ninguna factura");
    }
  }


  closeFacturaModal() {
    this.showModal = false;
  }

  ngOnInit() {
    //this.tenantService.setTenant('123456789')
    this.getCategorias();
    this.getTerceros();
    if (this.id !== null) {
      this.operacion = 'Editar ';
      this.getSolicitud(this.id);
    } else {
      // Inicializa los controles ngModel
      this.selectedCategoriaId = '';
      this.selectedTerceroId = '';
    }
  }

  getCategorias(): void {
    this.categoriasService.getListaCategorias(this.tenantId).subscribe((Data: any) => {
      this.categorias = [...Data.data];
    });
  }

  getTerceros(): void {
    this.tercerosService.getListaTerceros(this.tenantId).subscribe((Data: any) => {
      this.terceros = [...Data.data];
    });
  }

  getSolicitud(id: any) {
    this.loading = true;
    this.solicitudesService.getSolicitud(id, this.tenantId).subscribe((response: any) => {
      this.loading = false;
      const data = response.data; // Extraer la propiedad 'data' de la respuesta
      console.log('Datos obtenidos:', data);

      this.formulario = {
        solicitudId: data.solicitudId,
        tenantId: data.tenantId,
        fecha: new Date(data.fecha),
        detalle: data.detalle,
        valor: data.valor,
        categoria: data.categoria?.nombre,
        tercero: data.tercero?.nombreTercero,
        // Verificar si 'estado' es null antes de asignarlo al formulario
        estado: data.estado || { _id: '65d6a34bc04706dd1cdafd6c' }, // Asignar el valor por defecto si 'estado' es null
        facturaUrl: data.facturaUrl,
      };
      console.log('esta es la categoria', this.formulario.categoria, this.formulario.tercero);

      // Asignar valores por defecto a los controles ngModel
      this.selectedCategoriaId = data.categoria?._id || ''; // Asignar el ID de la categoría
      this.selectedTerceroId = data.tercero?._id || ''; // Asignar el ID del tercero
      console.log('Formulario después de la asignación:', this.formulario);
      console.log(this.selectedCategoriaId, this.selectedTerceroId);
    });
  }

  updateTercero(value: string): void {
    if (this.formulario.tercero) {
      this.formulario.tercero.nombreTercero = value;
    }
  }

  updateCategoria(value: string): void {
    if (this.formulario.categoria) {
      this.formulario.categoria.nombre = value;
    }
  }

  addSolicitud() {
    // this.loading = true;
    this.formulario.categoria = this.categorias.find((c) => c._id === this.selectedCategoriaId);
    this.formulario.tercero = this.terceros.find((t) => t._id === this.selectedTerceroId);
    if (this.id !== null) {
      this.sweetAlertService.showConfirmationDialog().then((result) => {
        if (result.isConfirmed) {
          this.realizarActualizacion();
        } else if (result.isDenied) {
          this.sweetAlertService.showErrorAlert('Los cambios no se guardaron');
          this.loading = false;
        } else {
          // Si hace clic en "Cancelar", redirige a la lista de solicitudes
          this.router.navigate(['/obtenerTodasLasSolicitudes']);
        }
      });
    } else {
      this.realizarInsercion();
    }
  }

  // realizarActualizacion() {
  //   // Verifica si la URL de la factura está definida
  //   console.log('url de fac definida: ', this.formulario.facturaUrl);

  //   if (this.formulario.facturaUrl) {
  //     // Realiza la actualización
  //     this.solicitudesService
  //       .updateSolicitud(
  //         this.id,
  //         this.formulario,
  //         this.tenantId,
  //         this.formulario.facturaUrl
  //       )
  //       .subscribe(() => {
  //         // Muestra una alerta de éxito
  //         const categoriaNombre = this.formulario.categoria?.nombre;
  //         this.sweetAlertService.showSuccessAlert(
  //           `La solicitud ${categoriaNombre} fue actualizada con éxito`
  //         );
  //         // Redirige a la lista de solicitudes
  //         this.router.navigate(['/obtenerTodasLasSolicitudes']);
  //       });
  //   } else {
  //     // Muestra un error si la URL de la factura no está definida
  //     console.error(
  //       'La URL de la factura está indefinida. No se puede realizar la actualización.'
  //     );
  //   }
  // }

  realizarActualizacion() {
    // Verifica si hay un archivo de factura seleccionado
    if (this.facturaSeleccionada) {
      // const formData = new FormData();
      // formData.append('facturaUrl', this.facturaSeleccionada);

      // Verifica si this.id no es null antes de llamar a la función updateSolicitud
      if (this.id !== null) {
        this.solicitudesService
          .updateSolicitud(
            this.id,
            this.formulario,
            this.tenantId,
            this.facturaSeleccionada
          )
          .subscribe(() => {
            // Muestra una alerta de éxito
            const categoriaNombre = this.formulario.categoria?.nombre;
            this.sweetAlertService.showSuccessAlert(
              `La solicitud ${categoriaNombre} fue actualizada con éxito`
            );
            // Redirige a la lista de solicitudes
            this.router.navigate(['/obtenerTodasLasSolicitudes']);
          });
      } else {
        console.error('El ID de la solicitud es null.');
      }
    } else {
      // Si no hay archivo de factura seleccionado, realiza la actualización sin la factura
      if (this.id !== null) {
        this.solicitudesService
          .updateSolicitud(
            this.id,
            this.formulario,
            this.tenantId,
            null // Pasar null como archivo de factura
          )
          .subscribe(() => {
            // Muestra una alerta de éxito
            const categoriaNombre = this.formulario.categoria?.nombre;
            this.sweetAlertService.showSuccessAlert(
              `La solicitud ${categoriaNombre} fue actualizada con éxito`
            );
            // Redirige a la lista de solicitudes
            this.router.navigate(['/obtenerTodasLasSolicitudes']);
          });
      } else {
        console.error('El ID de la solicitud es null.');
      }
    }
  }


  realizarInsercion() {
    console.log('este es el formulario con los datos en saveSolicitud= ', this.formulario, " esta es la url de la factura guardada: ", this.facturaSeleccionada);
    this.solicitudesService.savesolicitud(this.formulario, this.tenantId,this.facturaSeleccionada).subscribe(() => {
      console.log("estos son los datos al intentar guardar el formulario: ",this.formulario, " esta es la url de la factura guardada: ", this.facturaSeleccionada);
      
      // Muestra la alerta de éxito con SweetAlert2
      this.sweetAlertService.showSuccessToast('Solicitud guardada exitosamente');

      // Espera 1500 milisegundos (1.5 segundos) antes de navegar a la lista de egresos
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/obtenerTodasLasSolicitudes']);
      }, 1500);
    });
  }
}
