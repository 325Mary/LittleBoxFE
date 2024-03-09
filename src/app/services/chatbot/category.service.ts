import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Category } from '../../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  showCategories (): Observable<any>{
    return this.http.get("http://localhost:4200/showCategories")
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete("http://localhost:4200/deleteCategory/" + id)
            .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  saveCategory (category: Category): Observable <any>{
    return this.http.post("http://localhost:4200/saveCategory", category)
            .pipe(
            catchError(er =>{
              console.log(er)
            return er
            })
       )
    }

  getACategory(id: string): Observable <any>{
    return this.http.get("http://localhost:4200/category/" + id)
    .pipe(
      catchError(er => {
        console.log(er)
      return er
      })
    )
  }


  editCategory(id:string, category:Category): Observable <any>{
    return this.http.put("http://localhost:4200/editCategory/" + id, category)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }
}
