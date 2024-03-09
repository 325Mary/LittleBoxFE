import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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


const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sidebar', component: SidebarComponent},

  //Chatbot

  {path: 'formQuery', component: FormQueriesComponent },
  {path: 'listQuery', component: ListQueriesComponent },

  {path: 'formCategory', component: FormCategoryComponent },
  {path: 'listCategory', component: ListCategoryComponent },

  {path: 'formSubcategory', component: FormSubcategoryComponent },
  {path: 'listSubcategory', component: ListSubcategoryComponent },

  {path: 'chatbot', component: ChatbodyComponent},
  {path: 'menu', component: MenuComponent}


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
