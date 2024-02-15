import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../app/Components/home/home.component";
import {SidebarComponent  } from "../app/Components/sidebar/sidebar.component";
import { IndexComponent } from "../app/Components/index/index.component";

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sidebar', component: SidebarComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
