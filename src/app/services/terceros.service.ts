import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tercero } from '../interfaces/tercero';
import { Observable } from 'rxjs';
import { TokenValidationService } from '../services/token-validation-service.service';

@Injectable({
  providedIn: 'root',
})
export class TercerosService {
  private myAppUrl: string;
  urlGet = 'obtenerTodosLosTerceros';
  urlDelete = 'eliminarTercero';
  urlPost = 'guardarTercero';
  urlPut = 'modificarTercero';
  urlIpGet = 'obtenerTercero';

  constructor(private http: HttpClient,private tokenValidationService: TokenValidationService) {
    this.myAppUrl = environment.apiUrl;
  }

  getListaTerceros(tenantId: string): Observable<Tercero[]> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<Tercero[]>(`${this.myAppUrl}${this.urlGet}`, {
      params: { tenantId },
      headers: headers
    });
  }

  deleteTercero(terceroId: any, tenantId: string): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.delete<void>(
      `${this.myAppUrl}${this.urlDelete}/${terceroId}`,
      { params: { tenantId }, headers: headers },
      
    );
  }

  saveTercero(tercero: Tercero, tenantId: string): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`, tercero, {
      params: { tenantId },
      headers: headers
    });
  }

  getTercero(terceroId: any, tenantId: string): Observable<Tercero> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<Tercero>(
      `${this.myAppUrl}${this.urlIpGet}/${terceroId}`,
      {
        params: { tenantId },
        headers: headers
      },
    );
  }

  updateTercero(
    terceroId: any,
    nuevosDatos: Tercero,
    tenantId: string,
  ): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.put<void>(
      `${this.myAppUrl}${this.urlPut}/${terceroId}`,
      nuevosDatos,
      {
        params: { tenantId },
        headers: headers
      },
    );
  }
}
