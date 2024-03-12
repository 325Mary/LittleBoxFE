// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-lista-ingresos',
//   templateUrl: './lista-ingresos.component.html',
//   styleUrl: './lista-ingresos.component.scss'
// })
// export class ListaIngresosComponent {

// }


import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ingreso } from '../../../models/ingreso.model';
import { IngresoService } from '../../../services/ingresos/ingreso.service.service';
import { Paginate } from '../../../helpers/paginate';

@Component({
  selector: 'app-lista-ingresos',
  templateUrl: './lista-ingresos.component.html',
  styleUrls: ['./lista-ingresos.component.scss']
})
export class ListaIngresosComponent implements OnInit {

  @ViewChild('modalEliminar') modalEliminar: any;

  ingresos: Ingreso[] = [];
  currentPage: number = 1;
  ingresoSeleccionado: Ingreso | undefined;

  constructor(private router: Router, private ingresoService: IngresoService) { }

  ngOnInit(): void {
    this.cargarIngresos();
  }

  cargarIngresos(): void {
    this.ingresoService.obtenerIngresos().subscribe(
      (resp: any) => {
        this.ingresos = resp.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPageChange(event: number): void {
    this.currentPage = event;
  }

  verDetalle(ingreso: Ingreso): void {
    this.router.navigate(['/ingresos/detalle', ingreso.ingresoId]);
  }

  editarIngreso(ingreso: Ingreso): void {
    this.router.navigate(['/ingresos/editar', ingreso.ingresoId]);
  }

  abrirModalEliminar(ingreso: Ingreso): void {
    this.ingresoSeleccionado = ingreso;
    this.modalEliminar.open();
  }

  eliminarIngreso(): void {
    if (this.ingresoSeleccionado) {
      this.ingresoService.eliminarIngresoPorId(this.ingresoSeleccionado.ingresoId).subscribe(
        (resp: any) => {
          this.modalEliminar.close();
          this.cargarIngresos();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
