import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registrar } from '../interface/registrar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth'

  constructor(private http: HttpClient) { }

  login(credentials: { usuario: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
  
  register(request: Registrar): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, request);
  }
  
  logout(): void {
    localStorage.removeItem('token');
  }
  isAutheticated(): boolean{
    return !!localStorage.getItem('token');
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
