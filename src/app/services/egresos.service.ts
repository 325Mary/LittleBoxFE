import { Injectable, EventEmitter  } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse, HttpParams   } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators'; 
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenValidationService } from "../services/token-validation-service.service";

@Injectable({
  providedIn: 'root'
})
export class EgresosService {

  private baseUrl = "http://127.0.0.1:4000";
  tenantId: any;

  constructor(private http: HttpClient, private tokenValidationService:TokenValidationService) { }

  
  saveEgreso(egreso: any): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `${token}` });

    return this.http.post<any>(`${this.baseUrl}/guardarEgreso`, egreso, { headers });
  }




 
  obtenerEgresoS(filtros: any): Observable<any> {
    const token = this.tokenValidationService.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
  
    return this.http.post<any>(`${this.baseUrl}/obtenerTodosLosEgresos`, filtros, { headers });
  }
  
  
}