import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Usuario } from 'src/app/shared';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import { Inject,LOCALE_ID } from '@angular/core';

const LS_CHAVE: string = "funcionarios"

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  BASE_URL = "http://localhost:3000/funcionarios";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient, @Inject(LOCALE_ID)public locale: string
  ){}

  listarTodos(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.BASE_URL, this.httpOptions).pipe(
      map((funcionarios: Funcionario[]) => {
        return funcionarios.map(funcionario => {
          funcionario.dataNascimento = this.formatarDatalista(funcionario.dataNascimento!);
          return funcionario;
        });
      })
    );
  }

  inserir(funcionario: Funcionario): Observable<Funcionario | null> {
    return this.httpClient.post<Funcionario>(this.BASE_URL , funcionario, this.httpOptions);
  }

  buscarPorId(id: number): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(this.BASE_URL  + '/' + id, this.httpOptions);
  }

  atualizar(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>(this.BASE_URL + '/' + funcionario.id, funcionario, this.httpOptions);
  }

  remover(id: number): Observable<Funcionario>{
    return this.httpClient.delete<Funcionario>(this.BASE_URL  + '/' + id, this.httpOptions);
  }

  formatarData(dataNascimento: string): string{
    dataNascimento = formatDate(dataNascimento, "yyyy-MM-dd",this.locale);
    return dataNascimento;
  }

  formatarDatalista(dataNascimento: string): string{
    dataNascimento = formatDate(dataNascimento, "dd/MM/yyyy",this.locale);
    return dataNascimento;
  }
}
