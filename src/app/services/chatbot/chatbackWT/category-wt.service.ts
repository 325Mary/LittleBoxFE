import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Category } from '../../../Models/category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryWtService {

  private apiUrl: string;
  private endpoints = {
    showCategories: 'WTshowCategories',
    deleteCategory: 'WTdeleteCategory',
    saveCategory: 'WTsaveCategory',
    getCategory: 'WTgetCategory',
    editCategory: 'WTeditCategory',
  };

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  showCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.endpoints.showCategories}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return error;
        })
      );
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}${this.endpoints.deleteCategory}/${id}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return error;
        })
      );
  }

  saveCategory(category: Category): Observable<any> {
    return this.http.post<void>(`${this.apiUrl}${this.endpoints.saveCategory}`, category)
      .pipe(
        catchError((error) => {
          console.log(error);
          return error;
        })
      );
  }

  getCategory(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.endpoints.getCategory}/${id}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return error;
        })
      );
  }

  editCategory(id: string, category: Category): Observable<any> {
    return this.http.put<void>(`${this.apiUrl}${this.endpoints.editCategory}/${id}`, category)
      .pipe(
        catchError((error) => {
          console.log(error);
          return error;
        })
      );
  }
}
