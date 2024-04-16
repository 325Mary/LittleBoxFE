import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Query } from '../../Models/queries';
import { TokenValidationService } from '../token-validation-service.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QueriesService {
  private apiUrl: string;
  private endpoints = {
    getQueries: 'showQueries',
    deleteQuery: 'deleteQuery',
    saveQuery: 'saveQuery',
    getQuery: 'getAQuery',
    updateQuery: 'editQuery',
    getQueryWNumero: 'getQueryByNumber',
    getQueriesByScategory: 'getQueriesBySubcategory',
  };
  constructor(
    private http: HttpClient,
    private tokenValidationService: TokenValidationService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  showQueries(tenantId: string): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.get<any>(`${this.apiUrl}${this.endpoints.getQueries}`, {
      params: { tenantId },
      headers: headers,
    });
  }

  deleteQuery(id: string, tenantId: string): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.delete<void>(
      `${this.apiUrl}${this.endpoints.deleteQuery}/${id}`,
      {
        params: { tenantId },
        headers: headers,
      }
    );
  }

  saveQuery(Query: Query, tenantId: string): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.post<void>(
      `${this.apiUrl}${this.endpoints.saveQuery}`,
      Query,
      {
        params: { tenantId },
        headers: headers,
      }
    );
  }

  getAQuery(id: string, tenantId: string): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.get<any>(
      `${this.apiUrl}${this.endpoints.getQuery}/${id}`,
      {
        params: { tenantId },
        headers: headers,
      }
    );
  }

  editQuery(id: string, query: Query, tenantId: string): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.put<void>(
      `${this.apiUrl}${this.endpoints.updateQuery}/${id}`,
      query,
      {
        params: { tenantId },
        headers: headers,
      }
    );
  }

  getQueryIdentifier(identifier: string, tenantId: string): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.get<any>(
      `${this.apiUrl}${this.endpoints.getQueryWNumero}/${identifier}`,
      {
        params: { tenantId },
        headers: headers,
      }
    );
  }

  getQueriesBySubcategory(
    nameSubcategory: string,
    tenantId: string
  ): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.get<any>(
      `${this.apiUrl}${this.endpoints.getQueriesByScategory}/${nameSubcategory}`,
      {
        params: { tenantId },
        headers: headers,
      }
    );
  }
}
