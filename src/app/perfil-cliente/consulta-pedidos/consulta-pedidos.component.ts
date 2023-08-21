import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Pedido, PedidoStatusService, PedidosService, Roupa} from '../../shared';
import {OrcamentoService} from "../orcamentos/orcamentos.service";

@Component({
  selector: 'app-consulta-pedidos',
  templateUrl: './consulta-pedidos.component.html',
})
export class ConsultaPedidosComponent implements OnInit {
  precoTotal: number = 0;
  searchResult: any = [];
  pedidosId: string[] = [];
  roupas: Roupa[];
  pedidos: Pedido[];

  constructor(private pedidosService: PedidosService, private pedidoStatusService: PedidoStatusService, private orcamentoService: OrcamentoService) {
  }

  ngOnInit() {
    this.pedidosService.listar().subscribe(pedidos => this.pedidos = pedidos);
    this.orcamentoService.getRoupas().subscribe((response) => {
      this.roupas = response
    });
  }

  getColor(pedido: Pedido) {
    return this.pedidoStatusService.getCssColor(pedido);
  }

  pesquisarPedido(search: any): void {
    if (!search.value) return;
    this.pedidos.forEach((pedido) => {
      let numString = pedido['id'].toString();
      if (
        numString.includes(search.value) &&
        !this.pedidosId.includes(numString)
      ) {
        this.searchResult.push(pedido);
        this.pedidosId.push(pedido['id']);
        this.calculaPrecoTotal();
      }
    });

    console.log('searchResult', this.searchResult)
  }

  getNomeRoupa(roupaId: any) {
    if (typeof roupaId === 'number' || (typeof roupaId === 'string' && roupaId.trim() !== '')) {
      const roupa = this.roupas.find(r => Number(r.id) === Number(roupaId));
      return roupa?.nome || '';
    }
    return '';
  }

  getPrazoRoupa(roupaId: any) {
    if (typeof roupaId === 'number' || (typeof roupaId === 'string' && roupaId.trim() !== '')) {
      const roupa = this.roupas.find(r => Number(r.id) === Number(roupaId));
      return `${roupa?.prazo} Dias` || '';
    }
    return '';
  }

  calculaPrecoTotal(): void {
    this.precoTotal = 0;
    for (const pedido of this.searchResult) {
      for (const roupa of pedido.roupas) {
        const roupaEncontrada = this.roupas.find(r => Number(r.id) === Number(roupa.id));
        if (roupaEncontrada && roupaEncontrada.preco !== undefined) {
          this.precoTotal += roupaEncontrada.preco * roupa.quantidade;
        }
      }
    }
  }


  limparPesquisa(): void {
    this.precoTotal = 0;
    this.pedidosId = [];
    this.searchResult = [];
  }
}
