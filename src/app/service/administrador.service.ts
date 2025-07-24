import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador } from '../interface/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private baseUrl = "http://localhost:8080/api/administrador"

  constructor(private http:HttpClient) { }

  createAdministrador(administrador:Administrador): Observable<Administrador>{
    return this.http.post<Administrador>(`${this.baseUrl}`,administrador)
  }
  findAllAdministrador():Observable<Administrador[]>{
    return this.http.get<Administrador[]>(`${this.baseUrl}`)
  }
  updateAdministrador(id:number ,administrador:Administrador): Observable<Administrador>{
    return this.http.put<Administrador>(`${this.baseUrl}/${id}`,administrador)
  }  
  deleteAdministrador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  findByIdAdministrador(id:number):Observable<Administrador>{
    return this.http.get<Administrador>(`${this.baseUrl}/${id}`)
  }  
}
