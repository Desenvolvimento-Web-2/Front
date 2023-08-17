import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {PedidosService, PedidoStatusService, Pedido, PedidoStatus, Roupa} from '../../shared';

@Component({
  selector: 'app-cliente-pedido-table',
  templateUrl: './cliente-pedido-table.component.html',
  styleUrls: ['./cliente-pedido-table.component.css']
})
export class ClientePedidoTableComponent {
  @Input('pedidos') pedidos: Pedido[];
  @Input('roupas') roupas: Roupa[];
  status = PedidoStatus;

  constructor(private pedidosService: PedidosService, private router: Router, private pedidoStatusService: PedidoStatusService) {}
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

  remover(id: string) {
    if (confirm('Deseja mesmo cancelar o item?')) {
      this.pedidosService
        .mudarStatus(id, PedidoStatus.CANCELADO)
        .subscribe(() => this.atualizaTabela());
    }
  }

  navegarParaPagamento(id: string) {
    this.router.navigateByUrl(`/pedido/${id}/pagar`);
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
