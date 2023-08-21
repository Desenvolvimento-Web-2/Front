import { Component, Input } from '@angular/core';
import {
  Pedido,
  PedidoStatus,
  PedidoStatusService,
  PedidosService, Roupa,
} from '../../../shared';

@Component({
  selector: 'app-funcionario-pedido-table',
  templateUrl: './funcionario-pedido-table.component.html',
  styleUrls: ['./funcionario-pedido-table.component.css'],
})
export class FuncionarioPedidoTableComponent {
  @Input() pedidos: Pedido[];
  @Input('roupas') roupas: Roupa[];
  status = PedidoStatus

  constructor(private pedidosService: PedidosService, private pedidoStatusService: PedidoStatusService) {}

  getColor(pedido: Pedido) {
    return this.pedidoStatusService.getCssColor(pedido);
  }

  getNomeRoupa(roupaId: any) {
    if (typeof roupaId === 'number' || (typeof roupaId === 'string' && roupaId.trim() !== '')) {
      const roupa = this.roupas.find(r => Number(r.id) === Number(roupaId));
      return roupa?.nome || '';
    }
    return '';
  }

  getPrazoRoupa(roupaId: any){
    if (typeof roupaId === 'number' || (typeof roupaId === 'string' && roupaId.trim() !== '')) {
      const roupa = this.roupas.find(r => Number(r.id) === Number(roupaId));
      return `${roupa?.prazo} Dias` || '';
    }
    return '';
  }

  confirmarRecolhimento(id: string) {
    this.pedidosService
      .mudarStatus(id, PedidoStatus.RECOLHIDO)
      .subscribe(() => this.atualizaTabela());
    ;
  }

  confirmarLavagem(id: string) {
    this.pedidosService
      .mudarStatus(id, PedidoStatus.AGUARDANDO_PAGAMENTO)
      .subscribe(() => this.atualizaTabela());
  }

  finalizarPedido(id: string) {
    this.pedidosService
      .mudarStatus(id, PedidoStatus.FINALIZADO)
      .subscribe(() => this.atualizaTabela());
  }

  private atualizaTabela() {
    this.pedidosService
      .listar()
      .subscribe(pedidos => this.pedidos = pedidos);
  }
}
