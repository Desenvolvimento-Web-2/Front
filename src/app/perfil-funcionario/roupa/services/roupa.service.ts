import { Injectable } from '@angular/core';
import { Roupa } from 'src/app/shared/models/roupa.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoupaService {
  BASE_URL = "http://localhost:3000/roupas";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  roupa(roupa: Roupa): Observable<Roupa> {
    return this.httpClient.post<Roupa>(this.BASE_URL, roupa, this.httpOptions);
  }

  listarTodos(): Observable<Roupa[]> {
    return this.httpClient.get<Roupa[]>(this.BASE_URL, this.httpOptions);
  }

  buscarPorId(id: number): Observable<Roupa> {
    return this.httpClient.get<Roupa>(this.BASE_URL + '/' + id, this.httpOptions);
  }

  inserir(roupa: Roupa): Observable<Roupa> {
    return this.httpClient.post<Roupa>(this.BASE_URL, roupa, this.httpOptions);
  }

  remover(id: number): Observable<Roupa>{
    return this.httpClient.delete<Roupa>(this.BASE_URL + '/' + id, this.httpOptions);
  }

  alterar(roupa: Roupa): Observable<Roupa> {
    console.log(this.BASE_URL + '/' + roupa.id)
    return this.httpClient.put<Roupa>(this.BASE_URL + '/' + roupa.id, roupa, this.httpOptions);
  }
}