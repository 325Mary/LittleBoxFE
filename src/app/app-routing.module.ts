import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditSolicitudComponent } from '../app/Components/add-edit-solicitud/add-edit-solicitud.component';
import { ListEdictSolicitudComponent } from '../app/Components/list-edict-solicitud/list-edict-solicitud.component';
import { ListDeleteIngresosComponent } from '../app/Components/ingresos/list-delete-ingresos/list-delete-ingresos.component';
import { AddEditIngresoComponent } from '../app/Components/ingresos/add-edit-ingreso/add-edit-ingreso.component';
import { RoleGuard } from "../app/Guards/role.guard";

import { HomeComponent } from "../app/Components/home/home.component";
import {SidebarComponent  } from "../app/Components/sidebar/sidebar.component";
import { IndexComponent } from "../app/Components/index/index.component";
import { FormQueriesComponent } from './Components/ChatBot/form-queries/form-queries.component';
import { FormCategoryComponent } from './Components/ChatBot/form-category/form-category.component';
import { FormSubcategoryComponent } from './Components/ChatBot/form-subcategory/form-subcategory.component';
import { ChatbodyComponent } from './Components/ChatBot/chatbody/chatbody.component';
import { ListQueriesComponent } from './Components/ChatBot/list-queries/list-queries.component';
import { ListCategoryComponent } from './Components/ChatBot/list-category/list-category.component';
import { ListSubcategoryComponent } from './Components/ChatBot/list-subcategory/list-subcategory.component';
import { MenuComponent } from './Components/ChatBot/menu/menu.component';
  

import {PreRegistroComponent} from "../app/Components/pre-registro/pre-registro.component";
import { RegistroEmpresaComponent } from "../app/Components/registro-empresa/registro-empresa.component";
import { RegistroEmpleadoComponent } from "../app/Components/registro-empleado/registro-empleado.component";
import {EmployeesComponent  } from "../app/Components/employees/employees.component";
import {ChangePasswordComponent  } from "../app/Components/change-password/change-password.component";
import { PersonalizationComponent } from "../app/Components/personalization/personalization.component";
import { NotFoundComponent } from "../app/Components/not-found/not-found.component";
import { NoAutorizedComponent } from "../app/Components/no-autorized/no-autorized.component";
import { RestorePasswordComponent } from "../app/Components/restore-password/restore-password.component";
import {ListCompaniesComponent} from "../app/Components/list-companies/list-companies.component";
import { CreateUserAdminComponent } from "../app/Components/create-user-admin/create-user-admin.component";
import { ListCompaniesAprovedComponent } from "../app/Components/list-companies-aproved/list-companies-aproved.component";
import {SoliColaboradoresComponent  } from "../app/Components/soli-colaboradores/soli-colaboradores.component";
import { DataUserComponent } from "../app/Components/data-user/data-user.component";
import { CrearEgresoComponent } from "../app/Components/crear-egreso/crear-egreso.component";
import { CrearTerceroComponent } from "../app/Components/crear-tercero/crear-tercero.component";
import { CrearCategoriaComponent } from "../app/Components/crear-categoria/crear-categoria.component";
import { ListTercerosComponent } from "../app/Components/list-terceros/list-terceros.component";
import { ListCategoriasComponent } from "../app/Components/list-categorias/list-categorias.component";
import { ListEgresosComponent } from "../app/Components/list-egresos/list-egresos.component";
import { InformesComponent } from "../app/Components/informes/informes.component";
import {  GraficosComponent} from "../app/Components/graficos/graficos.component";



const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'home', component: ListEdictSolicitudComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'listIngresos', component: ListDeleteIngresosComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'obtenerTodosLosIngresos', component: ListDeleteIngresosComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'addIngreso', component: AddEditIngresoComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'editIngreso/:id', component: AddEditIngresoComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'sidebar', component: SidebarComponent },
  {
    path: 'obtenerTodasLasSolicitudes',
    component: ListEdictSolicitudComponent,
  },
  { path: 'add', component: AddEditSolicitudComponent,canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'edit/:id', component: AddEditSolicitudComponent,canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: 'sidebar', component: SidebarComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'SignIn/Up', component: PreRegistroComponent },
  // { path: 'SignIn/Up', component: ListEdictSolicitudComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: '', component: HomeComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'sidebar', component: SidebarComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  // { path: 'SignIn/Up', component: PreRegistroComponent },
  { path: 'registroEmpresa', component: RegistroEmpresaComponent },
  { path: 'registroEmpleado', component: RegistroEmpleadoComponent },
  { path: 'employees', component: EmployeesComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'SuperUsuario'] } },
  { path: 'changePassword/:userId', component: ChangePasswordComponent },
  { path: 'personalization', component: PersonalizationComponent },
  { path: 'noAutorized', component: NoAutorizedComponent },
  { path: 'restorePassword', component: RestorePasswordComponent},
  { path: 'listDeSoliDeEmpresas', component: ListCompaniesComponent},
  { path: 'crearUserAdmin', component: CreateUserAdminComponent},
  { path: 'listCompaniesAproved', component:ListCompaniesAprovedComponent },
  { path: 'SoliColaboradores', component: SoliColaboradoresComponent},
  { path: 'userData/:userId', component: DataUserComponent},
  { path: 'crearEgreso', component:CrearEgresoComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador'] }},
  { path: 'crearTercero', component: CrearTerceroComponent,  canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador'] }},
  { path: 'crearCategoria', component: CrearCategoriaComponent ,canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador'] }},
  { path: 'listTerceros', component: ListTercerosComponent ,canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador', 'Colaborador'] }},
  { path: 'listEgresos', component: ListEgresosComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador'] }},
  { path: 'listCatgorias', component: ListCategoriasComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador', 'Colaborador'] }},
  { path: 'Informes', component: InformesComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador'] }},
  { path: 'graficos', component: GraficosComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Gerente', 'Administrador'] }},
  { path: '**', component: NotFoundComponent }
  { path: '**', component: NotFoundComponent },


  { path: 'edit-query/:id', component: FormQueriesComponent},
  { path: 'edit-category/:id', component: FormCategoryComponent},
  { path: 'edit-subcategory/:id', component: FormSubcategoryComponent, outlet: 'modalOutlet'},

  {path: 'formQuery', component: FormQueriesComponent },
  {path: 'formCategory', component: FormCategoryComponent },
  {path: 'formSubcategory', component: FormSubcategoryComponent },


  {path: 'chatbot', component: ChatbodyComponent},
  { path: 'menu', component: MenuComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
