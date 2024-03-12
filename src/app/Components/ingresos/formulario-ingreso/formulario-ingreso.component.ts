
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Ingreso } from '../../../models/ingreso.model';
// import { IngresoService } from '../../../services/ingresos/ingreso.service.service';

// @Component({
//   selector: 'app-formulario-ingreso',
//   templateUrl: './formulario-ingreso.component.html',
//   styleUrls: ['./formulario-ingreso.component.css']
// })
// export class FormularioIngresoComponent implements OnInit {

//   formularioIngreso: FormGroup

//   constructor(private router: Router, private ingresoService: IngresoService) { }

//   ngOnInit(): void {
//     this.formularioIngreso = new FormGroup({
//       fecha: new FormControl('', Validators.required),
//       detalle: new FormControl('', Validators.required),
//       valor: new FormControl('', [Validators.required, Validators.min(1)]),
//     });
//   }

//   guardarIngreso(): void {
//     if (this.formularioIngreso.valid) {
//       const ingreso: Ingreso = {
//         fecha: this.formularioIngreso.value.fecha,
//         detalle: this.formularioIngreso.value.detalle,
//         valor: this.formularioIngreso.value.valor,
//       };
//       this.ingresoService.guardarIngreso(ingreso).subscribe(
//         (resp: any) => {
//           console.log(resp);
//           this.formularioIngreso.reset();
//           this.router.navigate(['/ingresos']);
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     } else {
//       console.log('Formulario no válido');
//     }
//   }

// }




import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ingreso } from '../../../models/ingreso.model';
import { IngresoService } from '../../../services/ingresos/ingreso.service.service';
import { response } from 'express';
import Swal from 'sweetalert2'
import { ListaIngresosComponent } from '../lista-ingresos/lista-ingresos.component';
import { error, log } from 'console';

@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.component.html',
  styleUrls: ['./formulario-ingreso.component.scss']
})
export class FormularioIngresoComponent {

  fecha: string = '';
  detalle: string = '';
  valor: number =0;
ingresoForm: any;

  constructor(private router: Router, private ingresoService: IngresoService) { }
  guardarIngreso(): void{
    this.ingresoService.guardarIngreso(this.ingresoForm).subscribe(
      (response:any)=>{
        Swal.fire('ingreso creado');
        // this.router.navigate([./ListaIngresosComponent])
    console.log("ingreso creado:", response);
      },
      (error: any)=> {
        console.log('error al guardar elingreso', error);

      }
    )
  }
}


//   guardarIngreso(): void {
//     if (this.fecha && this.detalle && this.valor !== null) {
//       const ingreso: Ingreso = {
//         fecha: this.fecha,
//         detalle: this.detalle,
//         valor: this.valor,
//       };
//       this.ingresoService.guardarIngreso(ingreso).subscribe(
//         (resp: any) => {
//           console.log(resp);
//           this.resetForm();
//           this.router.navigate(['/ingresos']);
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     } else {
//       console.log('Por favor complete todos los campos.');
//     }
//   }

//   resetForm(): void {
//     this.fecha = '';
//     this.detalle = '';
//     this.valor = null;
//   }
// }
