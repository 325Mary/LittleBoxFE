


import { ActivatedRoute, Router } from '@angular/router';
import { Ingreso } from "../../../models/ingreso.model";
import { IngresoService } from "../../../services/ingresos/ingreso.service.service";
import { CommonModule } from '@angular/common';
// import { CurrencyPipe } from '@angular/common';
import { Component, OnInit,input } from '@angular/core'; 
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalle-ingreso',
  templateUrl: './detalle-ingreso.component.html',
  // styles: './detalle-ingreso.component.scss',
  styleUrls: ['./detalle-ingreso.component.scss']
})
export class DetalleIngresoComponent implements OnInit {

  ingreso: Ingreso | null = null;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private ingresoService: IngresoService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        this.cargarIngreso(id);
      }
    );
  }

  cargarIngreso(id: string): void {
    this.ingresoService.obtenerIngresoPorId(id).subscribe(
      (resp: any) => {
        this.ingreso = resp.data;
      },
      (error) => {
        console.log(error);
      }
    );}
  fechaIso(fecha:Date) : string {
      const isoString = fecha.toISOString();
      return isoString.substring(0,10);
    }
  }


  // regresar(): void {
  //   this.router.navigate(['/ingresos']);
  // }



