import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { ObjectId } from 'mongoose';
import { Solicitud } from '../interfaces/solicitud';
import { TokenValidationService } from '../services/token-validation-service.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  private myAppUrl: string;
  private urlGet = 'obtenerTodasLasSolicitudes';
  private urlDelete = 'eliminarSolicitud';
  private urlPost = 'guardarSolicitud';
  private urlPut = 'modificarSolicitud';
  private urlPutEstado = 'modificarEstadoSolicitud';
  private urlIpGet = 'obtenerSolicitud';
  constructor(private http: HttpClient, private tokenValidationService: TokenValidationService,) {
    this.myAppUrl = environment.apiUrl;
  }

  getListaSolicitudes(tenantId: string): Observable<Solicitud[]> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<Solicitud[]>(`${this.myAppUrl}${this.urlGet}`, {
      params: { tenantId },
      headers: headers
    });
  }



  deleteSolicitud(solicitudId: any, tenantId: string): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.delete<void>(
      `${this.myAppUrl}${this.urlDelete}/${solicitudId}`,
      {
        params: { tenantId },
        headers: headers
      },
    );
  }

  savesolicitud(solicitud: Solicitud, tenantId: string): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`, solicitud, {
      params: { tenantId },
      headers:headers
    });
  }

  getSolicitud(solicitudId: string, tenantId: string): Observable<Solicitud> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.get<Solicitud>(
      `${this.myAppUrl}${this.urlIpGet}/${solicitudId}`,
      { params: { tenantId },
      headers: headers
    },
    );
  }

  updateSolicitud(
    solicitudId: any,
    nuevosDatos: Solicitud,
    tenantId: string,
    facturaUrl: string,
  ): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.put<void>(
      `${this.myAppUrl}${this.urlPut}/${solicitudId}`,
      nuevosDatos,
      { params: { tenantId, facturaUrl }, headers: headers },
    );
  }

  // updateSolicitud(
  //   solicitudId: string,
  //   nuevosDatos: Solicitud,
  //   file: File,
  // ): Observable<void> {
  //   const formData: FormData = new FormData();
  //   formData.append('factura', file, file.name);
  //   formData.append('nuevosDatos', JSON.stringify(nuevosDatos));
  
  //   const token = this.tokenValidationService.getToken();
  //   const headers = new HttpHeaders({ 'Authorization': `${token}` });
  
  //   return this.http.put<void>(
  //     `${this.myAppUrl}${this.urlPut}/${solicitudId}`,
  //     formData,
  //     { headers: headers }
  //   );
  // }
  

  updateEstadoSolicitud(
    solicitudId: any,
    nuevoEstadoId: string,
    tenantId: string,
  ): Observable<void> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    return this.http.put<void>(
      `${this.myAppUrl}${this.urlPutEstado}/${solicitudId}`,
      null,
      { params: { tenantId, nuevoEstadoId },headers: headers },
    );
  }

  uploadFactura(file: File, solicitudId: string): Observable<{ url: string }> {
    const formData: FormData = new FormData();
    formData.append('facturaUrl', file, file.name);

    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
  
    return this.http.put<{ url: string }>(
      `${this.myAppUrl}${this.urlPut}/${solicitudId}`, // Usando la solicitudId para actualizar la solicitud con la factura
      formData,
      {headers: headers}
    );
  }
  
}
