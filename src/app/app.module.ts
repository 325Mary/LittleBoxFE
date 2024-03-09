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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatbodyComponent } from './Components/ChatBot/chatbody/chatbody.component';
import { ListCategoryComponent } from './Components/ChatBot/list-category/list-category.component';
import { ListQueriesComponent } from './Components/ChatBot/list-queries/list-queries.component';
import { ListSubcategoryComponent } from './Components/ChatBot/list-subcategory/list-subcategory.component';
import { FormSubcategoryComponent } from './Components/ChatBot/form-subcategory/form-subcategory.component';
import { FormCategoryComponent } from './Components/ChatBot/form-category/form-category.component';
import { FormQueriesComponent } from './Components/ChatBot/form-queries/form-queries.component';
import { MenuComponent } from './Components/ChatBot/menu/menu.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    IndexComponent,
    ChatbodyComponent,
    ListCategoryComponent,
    ListQueriesComponent,
    ListSubcategoryComponent,
    FormSubcategoryComponent,
    FormCategoryComponent,
    FormQueriesComponent,
    MenuComponent
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
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
