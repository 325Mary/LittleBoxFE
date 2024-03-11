import { Component, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('modalContent') modalContent: ElementRef<any> | null = null;
  pdfSrc: string = '';

  facturaFile: File | null = null;

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

  

  onFileSelected(event: any) {
    console.log("Evento de cambio:", event);
  
    if (event.target.files.length === 0) {
      return;
    }
  
    const file = event.target.files[0];
  
    // Validar tipo de archivo
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      console.error('El archivo seleccionado no es compatible.');
      this.sweetAlertService.showErrorAlert('El archivo seleccionado no es compatible. Solo se admiten archivos JPG, JPEG, PNG y PDF.');
      return;
    }
  
    this.facturaSeleccionada = file;
  
    // Obtener la URL del archivo
    const reader = new FileReader();
    reader.onload = () => {
      this.formulario.facturaUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  if (this.facturaSeleccionada) {
     // Emitir la factura seleccionada al servicio modal
     this.modalService.enviarFacturaSeleccionada(this.facturaSeleccionada);
  }else{
    console.error('No se ha seleccionado ningun archivo.');
  }
   
  }
  
  

  // openFacturaModal() {
  //   console.log("Abriendo modal de factura");
  //   this.showModal = true;
  
  //   // Verificar si la facturaUrl está definida y no es nula
  //   if (!this.formulario.facturaUrl) {
  //     console.log("No se ha adjuntado ninguna factura");
  //     return;
  //   }
  
  //   // Descargar el archivo
  //   this.solicitudesService.descargarFactura(this.formulario.facturaUrl).subscribe((data: any) => {
  //     // Mostrar el archivo
  //     if (this.isImage) {
  //       const img = new Image();
  //       img.src = data;
  //       this.modalContent?.nativeElement.appendChild(img);
  //     } else if (this.isPdf) {
  //       // Convertir la respuesta a una URL de archivo
  //       const fileURL = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
  //       this.pdfSrc = fileURL;
  //     }
  //   });
  // }

  openFacturaModal() {
    console.log("Abriendo modal de factura");
    this.showModal = true;
  
    // Verificar si la facturaUrl está definida y no es nula
    if (!this.formulario.facturaUrl) {
      console.log("No se ha adjuntado ninguna factura");
      return;
    }
  
    // Se verifica si el archivo es una imagen
    const extension = this.formulario.facturaUrl?.split('.').pop()?.toLowerCase() || "";

    if (['jpg', 'jpeg', 'png'].includes(extension)) {
      this.isImage = true;
      this.isPdf = false;
  
      // Mostrar la imagen directamente desde la URL
      this.pdfSrc = this.formulario.facturaUrl;
    } else if (extension === 'pdf') {
      this.isImage = false;
      this.isPdf = true;
  
      // Mostrar el PDF directamente desde la URL
      this.pdfSrc = this.formulario.facturaUrl;
    } else {
      console.error('El tipo de archivo de la factura no es compatible.');
      this.sweetAlertService.showErrorAlert('El tipo de archivo de la factura no es compatible. Solo se admiten imágenes JPG, JPEG, PNG y archivos PDF.');
      return;
    }
  }

  // fileTypeMap: {
  //   [key: string]: string;
  // } = {
  //   '504b0304': 'application/pdf',
  //   'ffd8ffe0': 'image/jpeg',
  //   '89504e47': 'image/png',
  // };

  // getFileType(arrayBuffer: ArrayBuffer): string {
  //   const uint8Array = new Uint8Array(arrayBuffer);
  //   const bytes = uint8Array.slice(0, 4);
  //   const hex: string = bytes.reduce((acc, byte) => acc + byte.toString(16), '');
  //   return this.fileTypeMap[hex] || 'unknown';
  // }

  // openFacturaModal() {
  //   console.log("Abriendo modal de factura");
  //   this.showModal = true;
  
  //   // Verificar si la facturaUrl está definida y no es nula
  //   if (!this.formulario.facturaUrl) {
  //     console.log("No se ha adjuntado ninguna factura");
  //     return;
  //   }
  
  //   // Obtener la extensión del archivo
  //   const extension = this.formulario.facturaUrl?.split('.').pop()?.toLowerCase() || "";
  
  //   // Validar la extensión del archivo
  //   if (!['jpg', 'jpeg', 'png', 'pdf'].includes(extension)) {
  //     console.error('El tipo de archivo de la factura no es compatible.');
  //     this.sweetAlertService.showErrorAlert('El tipo de archivo de la factura no es compatible. Solo se admiten imágenes JPG, JPEG, PNG y archivos PDF.');
  //     return;
  //   }
  
  //   // Mostrar el archivo según su tipo
  //   if (['jpg', 'jpeg', 'png'].includes(extension)) {
  //     this.isImage = true;
  //     this.isPdf = false;
  //     this.pdfSrc = this.formulario.facturaUrl;
  //   } else if (extension === 'pdf') {
  //     this.isImage = false;
  //     this.isPdf = true;
  
  //     // Usar FileReader para obtener el archivo y verificar su tipo
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const arrayBuffer = reader.result as ArrayBuffer;
  //       const fileType = this.getFileType(arrayBuffer);
  
  //       if (fileType === 'application/pdf') {
  //         // Mostrar el PDF en el modal
  //         this.pdfSrc = URL.createObjectURL(new Blob([arrayBuffer], { type: fileType }));
  //       } else {
  //         console.error('El tipo de archivo no es compatible.');
  //         this.sweetAlertService.showErrorAlert('El tipo de archivo de la factura no es compatible. Solo se admiten archivos PDF.');
  //       }
  //     };
  //     if (this.facturaSeleccionada) {
  //       reader.readAsArrayBuffer(this.facturaSeleccionada);
  //     }
      
  //   }
  // }
  
  
  closeFacturaModal() {
    this.showModal = false;
  }

  removeFactura(): void {
    // Limpiar el campo que guarda la referencia al archivo
    this.formulario.facturaUrl = null;
    this.facturaFile = null;
  
    // Opcional: mostrar un mensaje de éxito al usuario
    this.sweetAlertService.showSuccessAlert('La factura se ha eliminado correctamente.');
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

  
  realizarActualizacion() {
    // Verifica si hay un archivo de factura seleccionado
    if (this.facturaSeleccionada) {
      // const formData = new FormData();
      // formData.append('facturaUrl', this.facturaSeleccionada);

      // Verifica si this.id no es null antes de llamar a la función updateSolicitud
      if (this.id !== null) {
        console.log("datos nuevos del formulario: ", this.formulario);
        
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
