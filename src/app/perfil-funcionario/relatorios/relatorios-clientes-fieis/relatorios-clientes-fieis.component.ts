import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RelatorioService } from '../services/relatorio.service';

interface IClienteFieis {
  posicao: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  quantidadePedidos: string;
  receitaGerada: string;
}

@Component({
  selector: 'app-relatorios-fieis',
  templateUrl: './relatorios-clientes-fieis.component.html'
})
export class RelatorioClientesFieisComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;
  clientes: IClienteFieis[];

  constructor(private readonly relatorioService: RelatorioService) { }

  ngOnInit(): void {
    this.clientes = [
      {
        posicao: '1',
        nome: 'João',
        email: 'João@ufpr.br',
        cpf: '12345678901',
        telefone: '41984043005',
        quantidadePedidos: '27',
        receitaGerada: 'R$ 423,50'
      },
      {
        posicao: '2',
        nome: 'José',
        email: 'José@ufpr.br',
        cpf: '01987654321',
        telefone: '41937426528',
        quantidadePedidos: '23',
        receitaGerada: 'R$ 391,00'
      },
      {
        posicao: '3',
        nome: 'Joana',
        email: 'Joana@ufpr.br',
        cpf: '36487249843',
        telefone: '41998743127',
        quantidadePedidos: '17',
        receitaGerada: 'R$ 316,20'
      },
    ]
  }

  gerarRelatorioClientesFieis() {
    const headers = ['Posição', 'Nome', 'Email', 'CPF', 'Telefone', 'Quantidade de Pedidos', 'Receita Gerada'];
    const data: string[][] = this.clientes.map(cliente => [
      cliente.posicao, cliente.nome, cliente.email, cliente.cpf, cliente.telefone, cliente.quantidadePedidos, cliente.receitaGerada
    ]);
    this.relatorioService.gerarPDF(headers, data);
  }
}