import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Subcategory } from '../../Models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  
  constructor(private http: HttpClient) { }

  showSubcategories (): Observable<any>{
    return this.http.get("http://localhost:4000/showSubcategories")
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  // showSubcategories (tenantId: string): Observable<any>{
  //   const token = this.tokenValidationService.getToken();
  //   const headers = new HttpHeaders ({ 'Authorization': `${token}`})
  //   return this.http.get<any[]>(`${this.myAppUrl}${this.urlGet}`, {
  //     params: { tenantId },
  //     headers: headers
  //   })}

  deleteSubcategories(id: string): Observable<any> {
    return this.http.delete("http://localhost:4000/deleteSubcategories/" + id)
            .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  saveSubcategory (subcategory: Subcategory): Observable <any>{
    return this.http.post("http://localhost:4000/saveSubcategory", subcategory)
            .pipe(
            catchError(er =>{
              console.log(er)
            return er
            })
       )
    }

    getASubcategory(id: string): Observable <any>{
    return this.http.get("http://localhost:4000/getASubcategory/" + id)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }


  editSubcategory(id:string, subcategory: Subcategory): Observable <any>{
    return this.http.put("http://localhost:4000/editSubcategory/" + id, subcategory)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  getSubcategoryIdentifier(identifier: string): Observable<any> {
    return this.http.get(`http://localhost:4000/getSubcategoryIdentifier/${identifier}`)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  getSubcategoryByCategory(identifierCategory: string): Observable<any> {
    return this.http.get(`http://localhost:4000/getSubcategoriesByCategory/${identifierCategory}`)
      .pipe(
        catchError(error => {
          console.log(error);
          return error;
        })
      );
  }

}
