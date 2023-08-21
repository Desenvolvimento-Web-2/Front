import {Component, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Pedido, PedidosService, PedidoStatus, Roupa} from 'src/app/shared';
import {OrcamentoService} from "../orcamentos/orcamentos.service";

@Component({
  selector: 'app-pagar-pedido',
  templateUrl: './pagar-pedido.component.html'
})
export class PagarPedidoComponent implements OnInit {
  pedido: Pedido;
  precoTotal: any
  prazo: string | undefined;
  metodoPagamento = '';
  roupas: Roupa[];

  constructor(private router: Router, private route: ActivatedRoute, private pedidoService: PedidosService, private orcamentoService: OrcamentoService,
  ) {
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    const res = this.pedidoService.buscarPorId(id)
      .subscribe(pedido => this.pedido = pedido);
    this.orcamentoService.getRoupas().subscribe((response) => {
      this.roupas = response
    });
  }


  getNomeRoupa(roupaId: any) {
    if (typeof roupaId === 'number' || (typeof roupaId === 'string' && roupaId.trim() !== '')) {
      const roupa = this.roupas.find(r => Number(r.id) === Number(roupaId));
      return roupa?.nome || '';
    }
    return '';
  }

  getPrazoRoupa() {
    const roupas = this.pedido.roupas
    const prazos = roupas?.map(item => {
      const roupa = this.roupas.find(r => Number(r.id) === Number(item.id));
      return roupa?.prazo || 0;
    });

    if (prazos) {
      const max = Math.max(...prazos)
      return (`${max} Dias`);
    }
    return
  }

  calculaPrecoTotal(): any {
    this.precoTotal = 0;
    if (this.pedido && this.pedido.roupas) {
      for (const roupa of this.pedido.roupas) {
        const roupaEncontrada = this.roupas.find(r => Number(r.id) === Number(roupa.id));
        if (roupaEncontrada && roupaEncontrada.preco !== undefined) {
          return this.precoTotal += roupaEncontrada.preco * roupa.quantidade;
        }
      }
    }
  }

  pagar(): void {
    this.pedidoService.mudarStatus(this.pedido.id, PedidoStatus.PAGO)
      .subscribe(() => this.router.navigateByUrl('/pedidos'));
  }
}
