import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Query } from '../../Models/queries';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  constructor(private http: HttpClient) { }

  showQueries(): Observable<any> {
    return this.http.get("http://localhost:4200/showQueries")
      .pipe(
        catchError(err => {
          console.log(err)
          return err
        })
      )
  }

  deleteQuery(id: string): Observable<any> {
    return this.http.delete("http://localhost:4200/deleteQuery/" + id)
            .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  saveQuery (Query: Query): Observable <any>{
    return this.http.post("http://localhost:4200/saveQuery", Query)
            .pipe(
            catchError(er =>{
              console.log(er)
            return er
            })
       )
    }

    getAQuery(id: string): Observable <any>{
    return this.http.get("http://localhost:4200/getAQuery/" + id)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }


  editQuery(id:string, query:Query): Observable <any>{
    return this.http.put("http://localhost:4200/editQuery/" + id, query)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  getConsultationIdentifier(identifier: string): Observable<any> {
    return this.http.get(`http://localhost:4200/getConsultationIdentifier/${identifier}`)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  // validarReferenciaExistente(referencia: number): Observable<any> {
  //   return this.http.get(`http://localhost:4200/validar-referencia/${referencia}`)
  //     .pipe(
  //       catchError(er => {
  //         console.log(er);
  //         return er;
  //       })
  //     );
  // }

  getQueriesBySubcategory(identifierSubcategory: string): Observable<any> {
    return this.http.get(`http://localhost:4200/getQueriesBySubcategory/${identifierSubcategory}`)
      .pipe(
        catchError(error => {
          console.log(error);
          return error;
        })
      );
  }

  // obtenerSubclases(idCategoria: string): Observable<any> {
  //   return this.http.get(`http://localhost:4200/obtenerSubclases/${idCategoria}`)
  //     .pipe(
  //       catchError(err => {
  //         console.log(err);
  //         return err;
  //       })
  //     );
  // }

}
