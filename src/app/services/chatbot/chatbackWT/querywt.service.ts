import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuerywtService {
  private apiUrl: string;
  private endpoints = {
    showQueries: 'WTshowQueries',
    saveQuery: 'WTsaveQuery',
    getAQuery: 'WTgetAQuery',
    getQueryByNumber: 'WTgetQueryByNumber',
    getQueriesBySubcategory: 'WTgetQueriesBySubcategory',
    deleteQuery: 'WTdeleteQuery',
    editQuery: 'WTeditQuery'
  };

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  showQueries(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.endpoints.showQueries}`).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  deleteQuery(id: string): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}${this.endpoints.deleteQuery}/${id}`).pipe(
      catchError((er) => {
        console.log(er);
        return er;
      })
    );
  }

  saveQuery(query: any): Observable<any> {
    return this.http.post<void>(`${this.apiUrl}${this.endpoints.saveQuery}`, query).pipe(
      catchError((er) => {
        console.log(er);
        return er;
      })
    );
  }

  getAQuery(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.endpoints.getAQuery}/${id}`).pipe(
      catchError((er) => {
        console.log(er);
        return er;
      })
    );
  }

  editQuery(id: string, query: any): Observable<any> {
    return this.http.put<void>(`${this.apiUrl}${this.endpoints.editQuery}/${id}`, query).pipe(
      catchError((er) => {
        console.log(er);
        return er;
      })
    );
  }

  getQueryByNumber(identifier: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.endpoints.getQueryByNumber}/${identifier}`).pipe(
      catchError((error) => {
        console.log(error);
        return error;
      })
    );
  }

  getQueriesBySubcategory(identifierSubcategory: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.endpoints.getQueriesBySubcategory}/${identifierSubcategory}`).pipe(
      catchError((error) => {
        console.log(error);
        return error;
      })
    );
  }
}
