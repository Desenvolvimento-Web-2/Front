import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoStatus, PedidosService } from '../../shared';

@Component({
  selector: 'app-orcamentos',
  templateUrl: './orcamentos.component.html'
})
export class OrcamentosComponent {
  valor: number;
  prazo: string;
  id: number;

  onReject() {
    this.pedidosService.mudarStatus(String(this.id), PedidoStatus.REJEITADO).subscribe(() => this.router.navigateByUrl('/pedidos'));
  }

  onApprove() {
    this.pedidosService.mudarStatus(String(this.id), PedidoStatus.EM_ABERTO).subscribe(() => this.router.navigateByUrl('/pedidos'));
  }

  constructor(private router: Router, private pedidosService: PedidosService) {
    const { valor, prazo, id } = this.router.getCurrentNavigation()?.extras
      ?.state as { valor: number; prazo: Date, id: number };
    this.valor = valor;
    this.prazo = prazo.toLocaleString('pt-BR');
    this.id = id;
  }
}
