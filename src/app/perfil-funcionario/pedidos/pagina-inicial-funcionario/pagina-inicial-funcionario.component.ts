import {Component, OnInit} from '@angular/core';
import {
  Pedido,
  PedidoStatus,
  PedidosService, Roupa,
} from '../../../shared';
import {OrcamentoService} from "../../../perfil-cliente/orcamentos/orcamentos.service";

@Component({
  selector: 'app-pagina-inicial-funcionario',
  templateUrl: './pagina-inicial-funcionario.component.html',
  styleUrls: ['./pagina-inicial-funcionario.component.css'],
})
export class PaginaInicialFuncionarioComponent implements OnInit {
  pedidos: Pedido[];
  roupas: Roupa[];

  constructor(private pedidosService: PedidosService, private orcamentoService: OrcamentoService,
  ) {}

  ngOnInit(): void {
    this.pedidosService
      .listar(PedidoStatus.EM_ABERTO)
      .subscribe((pedidos) => (this.pedidos = pedidos));
    this.orcamentoService.getRoupas().subscribe((response) => {
      this.roupas = response
    });
  }
}
