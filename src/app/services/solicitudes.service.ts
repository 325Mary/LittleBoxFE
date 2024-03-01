import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { ObjectId } from 'mongoose';
import { Solicitud } from '../interfaces/solicitud';
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
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl;
  }

  getListaSolicitudes(tenantId: string): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.myAppUrl}${this.urlGet}`, {
      params: { tenantId },
    });
  }

  deleteSolicitud(solicitudId: any, tenantId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.myAppUrl}${this.urlDelete}/${solicitudId}`,
      { params: { tenantId } },
    );
  }

  savesolicitud(solicitud: Solicitud, tenantId: string): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`, solicitud, {
      params: { tenantId },
    });
  }

  getSolicitud(solicitudId: string, tenantId: string): Observable<Solicitud> {
    return this.http.get<Solicitud>(
      `${this.myAppUrl}${this.urlIpGet}/${solicitudId}`,
      { params: { tenantId } },
    );
  }

  updateSolicitud(
    solicitudId: any,
    nuevosDatos: Solicitud,
    tenantId: string,
    facturaUrl: string,
  ): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.urlPut}/${solicitudId}`,
      nuevosDatos,
      { params: { tenantId, facturaUrl } },
    );
  }

  updateEstadoSolicitud(
    solicitudId: any,
    nuevoEstadoId: string,
    tenantId: string,
  ): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.urlPutEstado}/${solicitudId}`,
      null,
      { params: { tenantId, nuevoEstadoId } },
    );
  }

  uploadFactura(file: File): Observable<{ url: string }> {
    const formData: FormData = new FormData();
    formData.append('factura', file, file.name);

    return this.http.post<{ url: string }>(
      `${this.myAppUrl}/uploadFactura`, // Cambia esta URL por la ruta de tu servidor donde manejas la carga de archivos
      formData,
    );
  }
}
