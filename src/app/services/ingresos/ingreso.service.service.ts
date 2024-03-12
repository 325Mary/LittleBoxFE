// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class IngresoServiceService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingreso } from '../../models/ingreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  private url: string = 'http://localhost:4000/';

  constructor(private http: HttpClient) { }

  obtenerIngresos(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerIngresoPorId(id: any): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  guardarIngreso(ingreso: Ingreso): Observable<any> {
    return this.http.post(this.url, ingreso);
  }

  editarIngreso(ingreso: Ingreso): Observable<any> {
    return this.http.put(`${this.url}/${ingreso.ingresoId}`, ingreso);
  }

  eliminarIngresoPorId(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}
