import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Subcategory } from '../../../Models/subcategory';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryWtService {
  private apiUrl: string;
  private endpoints = {
    getScatsWT: 'WTshowSubcategories',
    deleteScaWT: 'WTdeleteSubcategories',
    saveScaWT: 'WTsaveSubcategory',
    getScatWT: 'WTgetSubcategory',
    editScaWT: 'WTeditSubcategory',
    getScaByCWt: 'WTgetSubcategoriesByCategory',
  };

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  showSubcategories(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}${this.endpoints.getScatsWT}`)
      .pipe(
        catchError((er) => {
          console.log(er);
          return er;
        })
      );
  }

  deleteSubcategories(id: string): Observable<any> {
    return this.http
      .delete<void>(`${this.apiUrl}${this.endpoints.deleteScaWT}/${id}`)
      .pipe(
        catchError((er) => {
          console.log(er);
          return er;
        })
      );
  }

  saveSubcategory(subcategory: Subcategory): Observable<any> {
    return this.http
      .post<void>(`${this.apiUrl}${this.endpoints.saveScaWT}`, subcategory)
      .pipe(
        catchError((er) => {
          console.log(er);
          return er;
        })
      );
  }

  getASubcategory(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}${this.endpoints.getScatWT}/${id}`)
      .pipe(
        catchError((er) => {
          console.log(er);
          return er;
        })
      );
  }

  editSubcategory(id: string, subcategory: Subcategory): Observable<any> {
    return this.http.put<void>(
      `${this.apiUrl}${this.endpoints.editScaWT}/${id}`,
      subcategory,)
      .pipe(
        catchError((er) => {
          console.log(er);
          return er;
        })
      );
  }

  getSubcategoryByCategory(identifierCategory: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}${this.endpoints.getScaByCWt}/${identifierCategory}`,
      )
      .pipe(
        catchError((error) => {
          console.log(error);
          return error;
        })
      );
  }
}
