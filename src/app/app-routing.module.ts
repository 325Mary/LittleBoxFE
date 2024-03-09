import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../app/Components/home/home.component";
import {SidebarComponent  } from "../app/Components/sidebar/sidebar.component";
import { IndexComponent } from "../app/Components/index/index.component";
import { FormQueriesComponent } from './Components/ChatBot/form-queries/form-queries.component';
import { FormCategoryComponent } from './Components/ChatBot/form-category/form-category.component';
import { FormSubcategoryComponent } from './Components/ChatBot/form-subcategory/form-subcategory.component';
import { ChatbodyComponent } from './Components/ChatBot/chatbody/chatbody.component';


const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sidebar', component: SidebarComponent},

  //Chatbot

  {path: 'formQuery', component: FormQueriesComponent },
  {path: 'formCategory', component: FormCategoryComponent },
  {path: 'formSubcategory', component: FormSubcategoryComponent },
  {path: 'chatbot', component: ChatbodyComponent}


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
