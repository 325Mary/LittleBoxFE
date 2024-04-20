import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Subcategory } from '../../Models/subcategory';
import { environment } from '../../../environments/environment';
import { TokenValidationService } from '../token-validation-service.service';

@Injectable({
  providedIn: 'root'
})
export class SSubcategoryService {

  private apiUrl: string;
  private endpoints = {
    getScategories: 'showSubcategories',
    deleteScategory: 'deleteSubcategories',
    saveScategory: 'saveSubcategory',
    getScategory: 'getASubcategory',
    editScategory: 'editSubcategory',
    getScategoryByC: 'getSubcategoriesByCategory',
  };

  constructor(
    private http: HttpClient,
    private tokenValidationService: TokenValidationService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  showSubcategories(tenantId: string): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.get<any>(
      `${this.apiUrl}${this.endpoints.getScategories}`,
      {
        params: { tenantId },
        headers: headers,
      }
    );
  }

  deleteSubcategories(id: string, tenantId: string): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.delete<void>(
      `${this.apiUrl}${this.endpoints.deleteScategory}/${id}`,
      {
        params: { tenantId },
        headers: headers,
      }
    );
  }

  saveSubcategory(subcategory: Subcategory, tenantId: string): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.post<void>(
      `${this.apiUrl}${this.endpoints.saveScategory}`,
      subcategory,
      {
        params: { tenantId },
        headers: headers,
      }
    );
  }

  getASubcategory(id: string, tenantId: string): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.get<any>(
      `${this.apiUrl}${this.endpoints.getScategory}/${id}`,
      {
        params: { tenantId },
        headers: headers,
      }
    );
  }

  editSubcategory(
    id: string,
    subcategory: Subcategory,
    tenantId: string
  ): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.put<void>(
      `${this.apiUrl}${this.endpoints.editScategory}/${id}`,
      subcategory,
      {
        params: { tenantId },
        headers: headers,
      }
    );
  }

  getSubcategoryByCategory(
    identifierCategory: string,
    tenantId: string
  ): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.get<any>(
      `${this.apiUrl}${this.endpoints.getScategoryByC}/${identifierCategory}`,
      {
        params: { tenantId },
        headers: headers,
      }
    );
  }
}
