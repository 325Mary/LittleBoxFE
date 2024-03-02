import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpResponse } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://127.0.0.1:4000';

  constructor(private httpClient: HttpClient) { }

  listCompanySuperU(): Observable<any[]> {
    const url = `${this.baseUrl}/GetCompaniesSuperU`;
    return this.httpClient.get<any[]>(url);
  }

  approveCompany(companyId: string): Observable<any> {
    const url = `${this.baseUrl}/companiesAproved/${companyId}`;
    return this.httpClient.put<any>(url, {});
  }

  activedCompany(companyId: string): Observable<any> {
    const url = `${this.baseUrl}/companiesActived/${companyId}`;
    return this.httpClient.put<any>(url, {});
  }

  denyCompany(companyId: string): Observable<any> {
    const url = `${this.baseUrl}/companiesDeny/${companyId}`;
    return this.httpClient.put<any>(url, {});
  }

  listCompanies(): Observable<any[]> {
    const url = `${this.baseUrl}/getAllCompanis`;
    return this.httpClient.get<any[]>(url);
  }
  disableCompany(companyId: string): Observable<any> {
    const url = `${this.baseUrl}/disable/${companyId}`;
    return this.httpClient.put<any>(url, {});
  }

  
}
