import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Pedido, PedidoStatus, PedidosService, Roupa} from '../../shared';
import {Observable} from "rxjs";
import { OrcamentoService } from "../orcamentos/orcamentos.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-listagem-pedidos',
  templateUrl: './listagem-pedidos.component.html',
  styleUrls: ['./listagem-pedidos.component.css'],
})
export class ListagemPedidosComponent implements OnInit {
  pedidos: Pedido[];
  filtroStatus: PedidoStatus;
  status = PedidoStatus;
  roupas: Roupa[];
  constructor(private pedidosService: PedidosService, private router: Router, private orcamentoService: OrcamentoService,
  ) {}

  ngOnInit() {
    this.pedidosService.listar().subscribe(
      pedidos => this.pedidos = pedidos
    );

    this.orcamentoService.getRoupas().subscribe((response) => {
      this.roupas = response
    });
  }

  filtrar() {
    this.pedidosService.listar(this.filtroStatus).subscribe(
      pedidos => this.pedidos = pedidos
    );
  }

  limparFiltro() {
    this.pedidosService.listar().subscribe(
      pedidos => this.pedidos = pedidos
    );
  }

  remover(id: string) {
    if (confirm('Deseja mesmo cancelar o item?')) {
      this.pedidosService
        .mudarStatus(id, PedidoStatus.CANCELADO)
        .subscribe(() => this.atualizaTabela());
    }
  }

  navegarParaPagamento(id: string) {
    this.router.navigateByUrl('/pedido/pagar');
  }

  navegarParaPedidoOrcamento() {
    this.router.navigateByUrl('/pedido');
  }

  private atualizaTabela() {
    this.pedidosService
      .listar()
      .subscribe(pedidos => this.pedidos = pedidos);
  }
}
