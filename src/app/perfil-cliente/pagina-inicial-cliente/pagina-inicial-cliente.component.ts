import { Component, OnInit } from '@angular/core';
import {Pedido, PedidoStatus, PedidosService, Roupa} from '../../shared';
import {OrcamentoService} from "../orcamentos/orcamentos.service";

@Component({
  selector: 'app-pagina-inicial-cliente',
  templateUrl: './pagina-inicial-cliente.component.html',
  styleUrls: ['./pagina-inicial-cliente.component.css']
})
export class PaginaInicialClienteComponent implements OnInit {
  pedidos: Pedido[];
  roupas: Roupa[];

  constructor(
    private readonly pedidosService: PedidosService,
    private orcamentoService: OrcamentoService,
  ) {}

  ngOnInit(): void {
    this.pedidosService.listar(PedidoStatus.EM_ABERTO)
      .subscribe(pedidos => this.pedidos = pedidos);
    this.orcamentoService.getRoupas().subscribe((response) => {
      this.roupas = response
    });
  }
}
