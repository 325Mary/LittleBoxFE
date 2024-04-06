import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Category } from '../../Models/category';
import { TokenValidationService } from '../token-validation-service.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string;
  private endpoints = {
    getCategories: 'showCategories',
    deleteCategory: 'deleteCategory',
    saveCategory: 'saveCategory',
    getCategory: 'category',
    updateCategory: 'editCategory'
  };

  constructor(
    private http: HttpClient,
    private tokenValidationService: TokenValidationService,
    ) { this.apiUrl = environment.apiUrl}

  showCategories ( tenantId: string): Observable<any>{
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<any>(`${this.apiUrl}${this.endpoints.getCategories}`, {
      params: { tenantId },
      headers: headers
    });
  }

  deleteCategory(id: string, tenantId: string): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.delete<any>(`${this.apiUrl}${this.endpoints.deleteCategory}/${id}`,  {
      params: { tenantId },
      headers: headers
    });
  }

  saveCategory (category: Category, tenantId: string): Observable <any>{
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });

    return this.http.post<void>(`${this.apiUrl}${this.endpoints.saveCategory}`, category, {
      params: { tenantId },
      headers: headers
    });
    }

  getACategory(id: string,tenantId: string): Observable <any>{
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<any>(
      `${this.apiUrl}${this.endpoints.getCategory}/${id}`,
      {
        params: { tenantId },
        headers: headers
      },
    );
  }


  editCategory(id:string, category:Category, tenantId:string): Observable <any>{
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });

    return this.http.put<void>(`${this.apiUrl}${this.endpoints.updateCategory}/${id}`, category,{
      params: { tenantId },
      headers: headers
    })
    
  }
}
