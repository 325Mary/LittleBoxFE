import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SafePipe } from './pipes/safe.pipe'; // Importa tu tubería personalizada

import { HomeComponent } from '../app/Components/home/home.component';
import { SidebarComponent } from '../app/Components/sidebar/sidebar.component';
import { FooterComponent } from '../app/Components/footer/footer.component';
import { NavbarComponent } from '../app/Components/navbar/navbar.component';
import { IndexComponent } from '../app/Components/index/index.component';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AddEditSolicitudComponent } from './Components/add-edit-solicitud/add-edit-solicitud.component';
import { ListEdictSolicitudComponent } from './Components/list-edict-solicitud/list-edict-solicitud.component';
//import { environment } from './environments/environment.prod'; // Para producción

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    IndexComponent,
    AddEditSolicitudComponent,
    ListEdictSolicitudComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCarouselModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [{ provide: environment, useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
