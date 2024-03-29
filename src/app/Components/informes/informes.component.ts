import { Component } from '@angular/core';
import { InformesService } from "../../services/informes.service";
import { CategoriasService } from "../../services/categoria.service";
import { TercerosService } from "../../services/terceros.service";
import { ExcelService } from "../../services/excel.service";

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent {
  fechaInicio: string = '';
  fechaFin: string = '';
  movimientosDeCaja: any[] = [];
  categoria: any[] = [];
  tercero: any[] = [];
  categoriaSeleccionada: any;
  terceroSeleccionado: any;

 
  constructor(private informesService: InformesService,
    private categoriasService: CategoriasService,
    private tercerosService: TercerosService,
    private excelService: ExcelService) { }

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
  

    obtenerMovimientoDeC() {
      const datos: any = {};
    
      // Verificar si las fechas están definidas antes de agregarlas a los filtros
      if (this.fechaInicio) {
        datos.fechaInicio = this.formatoFecha(new Date(this.fechaInicio));
      }
      if (this.fechaFin) {
        datos.fechaFin = this.formatoFecha(new Date(this.fechaFin));
      }
    
      // Agregar filtros de categoría y tercero si están seleccionados
      if (this.categoriaSeleccionada) {
        datos.categoria = this.categoriaSeleccionada;
      }
      if (this.terceroSeleccionado) {
        datos.tercero = this.terceroSeleccionado;
      }
    
      // Llamar al servicio para obtener los egresos con las fechas y filtros especificados
      this.informesService.obtenerMovimientoCaja(datos).subscribe(
        (response) => {
          // Verificar si la lista de movimientos está presente en la respuesta
          if (response.data && response.data.listaMovimientos) {
            // Mapear la lista de movimientos y formatear las fechas
            this.movimientosDeCaja = response.data.listaMovimientos.map((movimiento: any) => {
              movimiento.fecha = this.formatoFecha(new Date(movimiento.fecha));
              
              return movimiento;
              console.log('Movimientos de caja obtenidos:', response.data);            });
          } else {
            // Manejar el caso donde la lista de movimientos no está presente en la respuesta
            console.error('La lista de movimientos no está presente en la respuesta');
          }
        },
        (error) => {
          // Manejar errores
          console.error('Error al obtener los movimientos de caja:', error);
        }
      );
    }
    
  


    formatoFecha(fecha: Date): string {
      if (!fecha || isNaN(fecha.getTime())) {
        // Manejar casos de fecha nula o inválida
        return '';
      }
      return fecha.toISOString().substring(0, 10);
    }
    
    exportarExcel(): void {
      this.excelService.exportToExcel(this.movimientosDeCaja, 'informe_movimientos');
    }
    
}