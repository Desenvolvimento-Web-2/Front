import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicialClienteComponent } from './pagina-inicial-cliente/pagina-inicial-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaPedidosComponent } from './consulta-pedidos/consulta-pedidos.component';
import { ListagemPedidosComponent } from './listagem-pedidos/listagem-pedidos.component';
import { PagarPedidoComponent } from './pagar-pedido/pagar-pedido.component';
import { PedidoOnlineComponent } from './pedido-online/pedido-online.component';
import { OrcamentosComponent } from './orcamentos/orcamentos.component';
import { ClientePedidoTableComponent } from './cliente-pedido-table/cliente-pedido-table.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    PaginaInicialClienteComponent,
    ConsultaPedidosComponent,
    ListagemPedidosComponent,
    PagarPedidoComponent,
    PedidoOnlineComponent,
    OrcamentosComponent,
    ClientePedidoTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PerfilClienteModule { }
