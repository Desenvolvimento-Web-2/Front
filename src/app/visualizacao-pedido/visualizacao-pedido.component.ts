import {Component, OnInit} from '@angular/core';
import {
  Pedido,
  PedidosService, Roupa,
} from '../../../shared';
import {OrcamentoService} from "../../../perfil-cliente/orcamentos/orcamentos.service";

@Component({
  selector: 'app-visualizacao-pedido',
  templateUrl: './visualizacao-pedido.component.html',
})
export class VisualizacaoPedidoComponent implements OnInit {
  pedidos: Pedido[];
  roupas: Roupa[];

  constructor(private pedidosService: PedidosService, private orcamentoService: OrcamentoService,
  ) {
  }

  ngOnInit(): void {
    this.pedidosService
      .listar()
      .subscribe((pedidos) => (this.pedidos = pedidos));
    this.orcamentoService.getRoupas().subscribe((response) => {
      this.roupas = response
    });
  }
}
