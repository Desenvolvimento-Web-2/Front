import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Roupa } from '../../shared';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  constructor(private http: HttpClient) {}
  
  public getRoupas (): Observable<Roupa[]> {
    return this.http.get<Roupa[]>(`http://localhost:3000/roupas`)
  }
}

