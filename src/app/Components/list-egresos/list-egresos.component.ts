import { Component, OnInit } from '@angular/core';
import { EgresosService } from "../../services/egresos.service";
import { CategoriasService } from "../../services/categoria.service";
import { TercerosService } from "../../services/terceros.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEgresoComponent } from "../modal-egreso/modal-egreso.component";

@Component({
  selector: 'app-list-egresos',
  templateUrl: './list-egresos.component.html',
  styleUrls: ['./list-egresos.component.scss']
})
export class ListEgresosComponent implements OnInit {
  egresos: any[] = [];
  categoria: any[] = [];
  tercero: any[] = [];
  categoriaSeleccionada: any;
  terceroSeleccionado: any;
  fechaInicio: string = '';
  fechaFin: string = '';
  mostrarModal: boolean = false;
  egresoSeleccionado: any;

  constructor(
    private egresosService: EgresosService,
    private categoriasService: CategoriasService,
    private tercerosService: TercerosService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerTercerosPorTenantId();
  }

  obtenerCategorias(): void {
    this.categoriasService.obtenerTodasLasCategorias().subscribe(
      (response) => {
        this.categoria = response.data;
        if (this.categoria.length > 0) {
          this.categoriaSeleccionada = this.categoria[0]._id;
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
          this.terceroSeleccionado = this.tercero[0]._id;
        }
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  obtenerEgresos() {
    const filtros: any = {};
  
    // Verificar si las fechas están definidas antes de agregarlas a los filtros
    if (this.fechaInicio) {
      filtros.fechaInicio = this.formatoFecha(new Date(this.fechaInicio));
    }
    if (this.fechaFin) {
      filtros.fechaFin = this.formatoFecha(new Date(this.fechaFin));
    }
  
    // Agregar filtros de categoría y tercero si están seleccionados
    if (this.categoriaSeleccionada) {
      filtros.categoria = this.categoriaSeleccionada;
    }
    if (this.terceroSeleccionado) {
      filtros.tercero = this.terceroSeleccionado;
    }
  
    // Llamar al servicio para obtener los egresos con las fechas y filtros especificados
    this.egresosService.obtenerEgresoS(filtros).subscribe(
      (response) => {
        this.egresos = response.data.map((egreso:any) => {
          egreso.fecha = this.formatoFecha(new Date(egreso.fecha));
          return egreso;
        });
      },
      (error) => {
        // console.error('Error al obtener los egresos:', error);
        alert('No se encontraron los filtros Seleccionados')
      }
    );
  }
  


  formatoFecha(fecha: Date): string {
    const isoString = fecha.toISOString(); // Obtener la fecha en formato ISO 8601
    return isoString.substring(0, 10); // Recortar solo la parte de la fecha (YYYY-MM-DD)
  }
  
  
  
  verDetalle(egreso: any) {
    const modalRef = this.modalService.open(ModalEgresoComponent);
    modalRef.componentInstance.egreso = egreso;
  }

  
}
