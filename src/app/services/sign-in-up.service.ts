import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpResponse } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInUpService {
  private baseUrl: string;

  
  constructor(private httpClient: HttpClient) {
    this.baseUrl = "http://127.0.0.1:3200";
  }
}
