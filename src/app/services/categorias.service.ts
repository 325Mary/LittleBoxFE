import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Categoria } from '../interfaces/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private myAppUrl: string;
  urlGet = 'obtenerTodasLasCategorias';
  urlDelete = 'eliminarCategoria';
  urlPost = 'guardarCategoria';
  urlPut = 'modificarCategoria';
  urlIpGet = 'obtenerCategoria';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl;
  }

  getListaCategorias(tenantId: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.urlGet}`, {
      params: { tenantId },
    });
  }

  deleteCategoria(categoriaId: any, tenantId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.myAppUrl}${this.urlDelete}/${categoriaId}`,
      { params: { tenantId } },
    );
  }

  saveCategoria(categoria: Categoria, tenantId: string): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`, categoria, {
      params: { tenantId },
    });
  }

  getCategoria(categoriaId: any, tenantId: string): Observable<Categoria> {
    return this.http.get<Categoria>(
      `${this.myAppUrl}${this.urlIpGet}/${categoriaId}`,
      {
        params: { tenantId },
      },
    );
  }

  updateTercero(
    categoriaId: any,
    nuevosDatos: Categoria,
    tenantId: string,
  ): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.urlPut}/${categoriaId}`,
      nuevosDatos,
      {
        params: { tenantId },
      },
    );
  }
}
