import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from '../app/Components/home/home.component';
import { SidebarComponent } from '../app/Components/sidebar/sidebar.component';
import { FooterComponent } from '../app/Components/footer/footer.component';
import { NavbarComponent } from '../app/Components/navbar/navbar.component';
import { IndexComponent } from '../app/Components/index/index.component';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaIngresosComponent } from './Components/ingresos/lista-ingresos/lista-ingresos.component';
import { DetalleIngresoComponent } from './Components/ingresos/detalle-ingreso/detalle-ingreso.component';
import { FormularioIngresoComponent } from './Components/ingresos/formulario-ingreso/formulario-ingreso.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    IndexComponent,
    ListaIngresosComponent,
    DetalleIngresoComponent,
    FormularioIngresoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCarouselModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
