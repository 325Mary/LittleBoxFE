import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tercero } from '../interfaces/tercero';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl;
  }

  getListaTerceros(tenantId: string): Observable<Tercero[]> {
    return this.http.get<Tercero[]>(`${this.myAppUrl}${this.urlGet}`, {
      params: { tenantId },
    });
  }

  deleteTercero(terceroId: any, tenantId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.myAppUrl}${this.urlDelete}/${terceroId}`,
      { params: { tenantId } },
    );
  }

  saveTercero(tercero: Tercero, tenantId: string): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`, tercero, {
      params: { tenantId },
    });
  }

  getTercero(terceroId: any, tenantId: string): Observable<Tercero> {
    return this.http.get<Tercero>(
      `${this.myAppUrl}${this.urlIpGet}/${terceroId}`,
      {
        params: { tenantId },
      },
    );
  }

  updateTercero(
    terceroId: any,
    nuevosDatos: Tercero,
    tenantId: string,
  ): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.urlPut}/${terceroId}`,
      nuevosDatos,
      {
        params: { tenantId },
      },
    );
  }
}
