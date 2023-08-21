import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RelatorioService } from '../services/relatorio.service';
import {map, Observable} from "rxjs";
import {Funcionario} from "../../../shared";
import {HttpClient, HttpHeaders} from "@angular/common/http";

interface ICliente {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  cep: string;
  endereco: string;
}

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios-clientes.component.html'
})
export class RelatorioComponent implements OnInit {
  BASE_URL = "http://localhost:3000/usuario";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  @ViewChild('content', { static: false }) el!: ElementRef;
  clientes: Observable<ICliente[]>;

  constructor(private readonly relatorioService: RelatorioService,  private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.clientes = this.listarTodosUsuarios()
  }

  listarTodosUsuarios(): Observable<ICliente[]> {
    return this.httpClient.get<ICliente[]>(this.BASE_URL, this.httpOptions).pipe(
      map((clientes: ICliente[]) => {
        return clientes.map(cliente => {
          return cliente;
        });
      })
    );
  }

  gerarRelatorioClientes() {
    const headers = ['Nome', 'Email', 'CPF', 'Telefone', 'CEP', 'Endereço'];

    this.clientes.subscribe(clientes => {
      const data: string[][] = clientes.map(cliente => [
        cliente.nome, cliente.email, cliente.cpf, cliente.telefone, cliente.cep, cliente.endereco
      ]);
      this.relatorioService.gerarPDF(headers, data);
    });
  }

}