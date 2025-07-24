import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mantenimiento } from '../interface/mantenimiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
 private baseUrl = "http://localhost:8080/api/cocinero"

  constructor(private http:HttpClient) { }


  createMantenimiento(mantenimiento:Mantenimiento): Observable<Mantenimiento>{
    return this.http.post<Mantenimiento>(`${this.baseUrl}`,mantenimiento)
  }
  findAllMantenimiento():Observable<Mantenimiento[]>{
    return this.http.get<Mantenimiento[]>(`${this.baseUrl}`)
  }
  updateMantenimiento(id:number ,mantenimiento:Mantenimiento): Observable<Mantenimiento>{
    return this.http.put<Mantenimiento>(`${this.baseUrl}/${id}`,mantenimiento)
  }  
  deleteMantenimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  findByIdMantenimiento(id:number):Observable<Mantenimiento>{
    return this.http.get<Mantenimiento>(`${this.baseUrl}/${id}`)
  } 
}
