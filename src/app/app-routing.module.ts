import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/Components/home/home.component';
import { SidebarComponent } from '../app/Components/sidebar/sidebar.component';
import { IndexComponent } from '../app/Components/index/index.component';
import { AddEditSolicitudComponent } from '../app/Components/add-edit-solicitud/add-edit-solicitud.component';
import { ListEdictSolicitudComponent } from '../app/Components/list-edict-solicitud/list-edict-solicitud.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sidebar', component: SidebarComponent },
  {
    path: 'obtenerTodasLasSolicitudes',
    component: ListEdictSolicitudComponent,
  },
  { path: 'add', component: AddEditSolicitudComponent },
  { path: 'edit/:id', component: AddEditSolicitudComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
