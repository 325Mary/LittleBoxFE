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
import {  PreRegistroComponent} from "../app/Components/pre-registro/pre-registro.component";
import { RegistroEmpresaComponent } from '../app/Components/registro-empresa/registro-empresa.component';
import { RegistroEmpleadoComponent } from '../app/Components/registro-empleado/registro-empleado.component';
import { EmployeesComponent } from '../app/Components/employees/employees.component';
import { ChangePasswordComponent } from '../app/Components/change-password/change-password.component';
import { PersonalizationComponent } from '../app/Components/personalization/personalization.component';
import { SignInUpService } from './services/sign-in-up.service';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { environment } from '../environments/environment';
import { AddEditSolicitudComponent } from './Components/add-edit-solicitud/add-edit-solicitud.component';
import { ListEdictSolicitudComponent } from './Components/list-edict-solicitud/list-edict-solicitud.component';
//import { environment } from './environments/environment.prod'; // Para producción
=======
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NoAutorizedComponent } from './Components/no-autorized/no-autorized.component';
import { RestorePasswordComponent } from './Components/restore-password/restore-password.component';
import { SolicitudesDeEmpresasComponent } from './Components/solicitudes-de-empresas/solicitudes-de-empresas.component';
import { ListCompaniesComponent } from './Components/list-companies/list-companies.component';
import { CreateUserAdminComponent } from './Components/create-user-admin/create-user-admin.component';
import { ListCompaniesAprovedComponent } from './Components/list-companies-aproved/list-companies-aproved.component';
import { SoliColaboradoresComponent } from './Components/soli-colaboradores/soli-colaboradores.component';
import { DataUserComponent } from './Components/data-user/data-user.component';
>>>>>>> 69fd18093c02d349a211b8ddc783ce3723cc68e5

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PreRegistroComponent,
    RegistroEmpresaComponent,
    RegistroEmpleadoComponent,
    HomeComponent,
    IndexComponent,
    SidebarComponent,
    EmployeesComponent,
    ChangePasswordComponent,
    PersonalizationComponent,
    FooterComponent,
<<<<<<< HEAD
    NavbarComponent,
    IndexComponent,
    AddEditSolicitudComponent,
    ListEdictSolicitudComponent,
    SafePipe,
=======
    NotFoundComponent,
    NoAutorizedComponent,
    RestorePasswordComponent,
    SolicitudesDeEmpresasComponent,
    ListCompaniesComponent,
    CreateUserAdminComponent,
    ListCompaniesAprovedComponent,
    SoliColaboradoresComponent,
    DataUserComponent
>>>>>>> 69fd18093c02d349a211b8ddc783ce3723cc68e5
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCarouselModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
<<<<<<< HEAD
  ],
  providers: [{ provide: environment, useValue: environment }],
  bootstrap: [AppComponent],
=======
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })
    
  ],
  providers: [SignInUpService],
  bootstrap: [AppComponent]
>>>>>>> 69fd18093c02d349a211b8ddc783ce3723cc68e5
})
export class AppModule {}
