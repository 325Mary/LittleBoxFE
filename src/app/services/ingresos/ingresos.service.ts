import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// import { ObjectId } from 'mongoose';
import { Ingreso } from '../../interfaces/ingreso';
import { TokenValidationService } from '../../services/token-validation-service.service';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  private myAppUrl: string;
  private urlGet = 'obtenerTodosLosIngresos';
  private urlDelete = 'eliminarIngreso';
  private urlPost = 'guardarIngreso';
  private urlPut = 'modificarIngreso';
  private urlIpGet = 'obtenerIngreso';
  constructor(private http: HttpClient, private tokenValidationService: TokenValidationService,) {
    this.myAppUrl = environment.apiUrl;
  }
  getListaIngresos(tenantId: string): Observable<Ingreso[]> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<Ingreso[]>(`${this.myAppUrl}${this.urlGet}`, {
      params: { tenantId },
      headers: headers
    });
  }



  deleteIngreso(Id: any, tenantId: string): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.delete<void>(
      `${this.myAppUrl}${this.urlDelete}/${Id}`,
      {
        params: { tenantId },
        headers: headers
      },
    );
  }

  
  saveIngreso(
    ingreso: Ingreso,
    tenantId: string,
    file: File | null
  ): Observable<void> {

    const fechaDate = new Date(ingreso.fecha);

    const formData: FormData = new FormData();
    formData.append('ingresoId', ingreso.ingresoId?.toString()); 
    formData.append('fecha', fechaDate.toISOString());
    formData.append('detalle', ingreso.detalle);
    formData.append('valor', ingreso.valor.toString());
    formData.append('tenantId', tenantId);
      
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
  
    return this.http.post<void>(
      `${this.myAppUrl}${this.urlPost}`,
      formData,
      { headers: headers }
    );
  }
  

  getIngreso(Id: string, tenantId: string): Observable<Ingreso> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<Ingreso>(
      `${this.myAppUrl}${this.urlIpGet}/${Id}`,
      { params: { tenantId },
      headers: headers
    },
    );
  }

    

  updateSolicitud(
    Id: any,
    nuevosDatos: Ingreso,
    tenantId: string,
  ): Observable<Ingreso> {

    const fechaDate = new Date(nuevosDatos.fecha);
    const formData = new FormData();
    formData.append('ingresoId', nuevosDatos.ingresoId.toString()); 
    formData.append('fecha', fechaDate.toISOString());
    formData.append('detalle', nuevosDatos.detalle);
    formData.append('valor', nuevosDatos.valor.toString()); // Convertir valor a cadena
    formData.append('tenantId', tenantId);
      
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
  
    return this.http.put<Ingreso>(
      `${this.myAppUrl}${this.urlPut}/${Id}`,
      formData,
      { headers:headers }
    );
  }
  
}
