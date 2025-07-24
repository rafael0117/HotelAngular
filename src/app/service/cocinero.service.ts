import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cocinero } from '../interface/cocinero';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocineroService {

  private baseUrl = "http://localhost:8080/api/cocinero"

  constructor(private http:HttpClient) { }

  createCocinero(cocinero:Cocinero): Observable<Cocinero>{
    return this.http.post<Cocinero>(`${this.baseUrl}`,cocinero)
  }
  findAllCocinero():Observable<Cocinero[]>{
    return this.http.get<Cocinero[]>(`${this.baseUrl}`)
  }
  updateCocinero(id:number ,cocinero:Cocinero): Observable<Cocinero>{
    return this.http.put<Cocinero>(`${this.baseUrl}/${id}`,cocinero)
  }  
  deleteCocinero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  findByIdCocinero(id:number):Observable<Cocinero>{
    return this.http.get<Cocinero>(`${this.baseUrl}/${id}`)
  }  
}
