import { Injectable } from '@angular/core';
import { Login, UsuarioLogado } from '../../shared';
import {map, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const LS_CHAVE: string = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  BASE_URL = "http://localhost:3000/usuario";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public get usuarioLogado(): UsuarioLogado {
    let usu = localStorage[LS_CHAVE];
    return usu ? JSON.parse(localStorage[LS_CHAVE]) : null;
  }

  public set usuarioLogado(usuario: UsuarioLogado) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

  login(login: Login): Observable<UsuarioLogado | null> {
    return this.httpClient.get<UsuarioLogado[]>(this.BASE_URL, this.httpOptions).pipe(
      map(usuarios => {
        const usuarioEncontrado = usuarios.find(u => u.email === login.email && u.senha === login.senha);
        return usuarioEncontrado || null;
      })
    );
  }
}
