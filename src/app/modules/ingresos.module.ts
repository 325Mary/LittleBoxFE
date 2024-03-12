// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class IngresosModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaIngresosComponent } from "../Components/ingresos/lista-ingresos/lista-ingresos.component";
import { DetalleIngresoComponent } from "../Components/ingresos/detalle-ingreso/detalle-ingreso.component";
import { FormularioIngresoComponent } from "../Components/ingresos/formulario-ingreso/formulario-ingreso.component";
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: ListaIngresosComponent
  },
  {
    path: 'detalle/:id',
    component: DetalleIngresoComponent
  },
  {
    path: 'crear',
    component: FormularioIngresoComponent
  },
  {
    path: 'editar/:id',
    component: FormularioIngresoComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgModule
  ],
  exports: [
    RouterModule
  ]
})
export class IngresosModule { }
