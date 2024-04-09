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
import { PreRegistroComponent } from '../app/Components/pre-registro/pre-registro.component';
import { RegistroEmpresaComponent } from '../app/Components/registro-empresa/registro-empresa.component';
import { RegistroEmpleadoComponent } from '../app/Components/registro-empleado/registro-empleado.component';
import { EmployeesComponent } from '../app/Components/employees/employees.component';
import { ChangePasswordComponent } from '../app/Components/change-password/change-password.component';
import { PersonalizationComponent } from '../app/Components/personalization/personalization.component';
import { SignInUpService } from './services/sign-in-up.service';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ChatbodyComponent } from './Components/ChatBot/chatbody/chatbody.component';
import { ListCategoryComponent } from './Components/ChatBot/list-category/list-category.component';
import { ListQueriesComponent } from './Components/ChatBot/list-queries/list-queries.component';
import { ListSubcategoryComponent } from './Components/ChatBot/list-subcategory/list-subcategory.component';
import { FormSubcategoryComponent } from './Components/ChatBot/form-subcategory/form-subcategory.component';
import { FormCategoryComponent } from './Components/ChatBot/form-category/form-category.component';
import { FormQueriesComponent } from './Components/ChatBot/form-queries/form-queries.component';
import { MenuComponent } from './Components/ChatBot/menu/menu.component';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AddEditSolicitudComponent } from './Components/add-edit-solicitud/add-edit-solicitud.component';
import { ListEdictSolicitudComponent } from './Components/list-edict-solicitud/list-edict-solicitud.component';
//import { environment } from './environments/environment.prod'; // Para producción
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NoAutorizedComponent } from './Components/no-autorized/no-autorized.component';
import { RestorePasswordComponent } from './Components/restore-password/restore-password.component';
import { SolicitudesDeEmpresasComponent } from './Components/solicitudes-de-empresas/solicitudes-de-empresas.component';
import { ListCompaniesComponent } from './Components/list-companies/list-companies.component';
import { CreateUserAdminComponent } from './Components/create-user-admin/create-user-admin.component';
import { ListCompaniesAprovedComponent } from './Components/list-companies-aproved/list-companies-aproved.component';
import { SoliColaboradoresComponent } from './Components/soli-colaboradores/soli-colaboradores.component';
import { DataUserComponent } from './Components/data-user/data-user.component';
import { CrearEgresoComponent } from './Components/crear-egreso/crear-egreso.component';
import { CrearTerceroComponent } from './Components/crear-tercero/crear-tercero.component';
import { CrearCategoriaComponent } from './Components/crear-categoria/crear-categoria.component';
import { ListTercerosComponent } from './Components/list-terceros/list-terceros.component';
import { ListCategoriasComponent } from './Components/list-categorias/list-categorias.component';
import { ListEgresosComponent } from './Components/list-egresos/list-egresos.component';
import { EgresosService } from '../app/services/egresos.service';
import { ModalEgresoComponent } from './Components/modal-egreso/modal-egreso.component';
import { ModalTerceroComponent } from './Components/modal-tercero/modal-tercero.component';
import { CompanyService } from './services/company.service';
import { ModalCompanySolicitudComponent } from './Components/modal-company-solicitud/modal-company-solicitud.component';
import { InformesComponent } from './Components/informes/informes.component';
import { InformesService } from './services/informes.service';
import { GraficosComponent } from './Components/graficos/graficos.component';

// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ListDeleteIngresosComponent } from './Components/ingresos/list-delete-ingresos/list-delete-ingresos.component';
import { AddEditIngresoComponent } from './Components/ingresos/add-edit-ingreso/add-edit-ingreso.component';
import { EditSubcategoryComponent } from './Components/ChatBot/edit-subcategory/edit-subcategory.component';
import { EditQueriesComponent } from './Components/ChatBot/edit-queries/edit-queries.component';
import { EditCategoryComponent } from './Components/ChatBot/edit-category/edit-category.component';

//Chatback
import { FormSubcWtComponent } from './Components/ChatBot/form-subc-wt/form-subc-wt.component';
import { FormCatWtComponent } from './Components/ChatBot/form-cat-wt/form-cat-wt.component';
import { FormQueWtComponent } from './Components/ChatBot/form-que-wt/form-que-wt.component';
import { EditQueWtComponent } from './Components/ChatBot/edit-que-wt/edit-que-wt.component';
import { EditSubcaWtComponent } from './Components/ChatBot/edit-subca-wt/edit-subca-wt.component';
import { EditCatWtComponent } from './Components/ChatBot/edit-cat-wt/edit-cat-wt.component';
import { ChatbackWtComponent } from './Components/ChatBot/chatback-wt/chatback-wt.component';
import { ListCatWtComponent } from './Components/ChatBot/list-cat-wt/list-cat-wt.component';
import { ListSubcaWtComponent } from './Components/ChatBot/list-subca-wt/list-subca-wt.component';
import { ListQueWtComponent } from './Components/ChatBot/list-que-wt/list-que-wt.component';
import { SeleccionarUsersComponent } from './Components/ChatBot/seleccionar-users/seleccionar-users.component';
import { WTMenuComponent } from './Components/ChatBot/wtmenu/wtmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    AddEditSolicitudComponent,
    ListEdictSolicitudComponent,
    SafePipe,
    IndexComponent,
    ChatbodyComponent,
    ListCategoryComponent,
    ListQueriesComponent,
    ListSubcategoryComponent,
    FormSubcategoryComponent,
    FormCategoryComponent,
    FormQueriesComponent,
    MenuComponent,
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
    NotFoundComponent,
    NoAutorizedComponent,
    RestorePasswordComponent,
    SolicitudesDeEmpresasComponent,
    ListCompaniesComponent,
    CreateUserAdminComponent,
    ListCompaniesAprovedComponent,
    SoliColaboradoresComponent,
    DataUserComponent,
    EditCategoryComponent,
    EditSubcategoryComponent,
    EditQueriesComponent,
    CrearEgresoComponent,
    CrearTerceroComponent,
    CrearCategoriaComponent,
    ListTercerosComponent,
    ListCategoriasComponent,
    ListEgresosComponent,
    ModalEgresoComponent,
    ModalTerceroComponent,
    ModalCompanySolicitudComponent,
    InformesComponent,
    GraficosComponent,
    // DataUserComponent,
    ListDeleteIngresosComponent,
    AddEditIngresoComponent,
    FormSubcWtComponent,
    FormCatWtComponent,
    FormQueWtComponent,
    EditQueWtComponent,
    EditSubcaWtComponent,
    EditCatWtComponent,
    ChatbackWtComponent,
    ListCatWtComponent,
    ListSubcaWtComponent,
    ListQueWtComponent,
    WTMenuComponent,
    SeleccionarUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCarouselModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
  ],
  providers: [
    SignInUpService,
    { provide: environment, useValue: environment },
    EgresosService,
    CompanyService,
    InformesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
