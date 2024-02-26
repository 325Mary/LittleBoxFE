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

@Component({
  selector: 'app-add-edit-solicitud',
  templateUrl: './add-edit-solicitud.component.html',
  styleUrl: './add-edit-solicitud.component.scss',
})
export class AddEditSolicitudComponent {
  loading: boolean = false;
  id: string | null;
  operacion: string = 'Agregar ';
  categorias: Categoria[] = [];
  terceros: Tercero[] = [];
  estadoSolicitud: EstadoSolicitud[] = [];

  selectedCategoriaId: string = '';
  selectedTerceroId: string = '';

  formulario: Solicitud = {
    _id: '',
    solicitudId: 0,
    tenantId: '',
    tercero: null,
    fecha: new Date(),
    detalle: '',
    categoria: null,
    valor: 0,
    estado: null,
    facturaUrl: '',
  };

  constructor(
    private solicitudesService: SolicitudesService,
    private categoriasService: CategoriasService,
    private tercerosService: TercerosService,
    private estadoSolicitudesService: EstadoSolicitudService,
    private router: Router,
    private aRouter: ActivatedRoute,
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  getCategorias() {
    this.categoriasService
      .getListaCategorias(this.formulario.tenantId)
      .subscribe((data) => {
        this.categorias = data;
      });
  }
  ngOnInit() {
    //this.tenantService.setTenant('123456789')
    this.getCategorias();
    this.getTerceros();
    if (this.id !== null) {
      this.operacion = 'Editar ';
      this.getEgreso(this.id);
    } else {
      // Inicializa los controles ngModel
      this.selectedCategoriaId = '';
      this.selectedTerceroId = '';
    }
  }
}
