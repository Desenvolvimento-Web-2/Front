import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoupaModule } from './roupa/roupa.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
// import { PaginaInicialFuncionarioComponent } from './pedidos/pagina-inicial-funcionario/pagina-inicial-funcionario.component';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
// import { FuncionarioPedidoTableComponent } from './pedidos/funcionario-pedido-table/funcionario-pedido-table.component';
// import { VisualizacaoPedidoComponent } from './pedidos/visualizacao-pedido/visualizacao-pedido.component';
// import { RecolhimentoPedidoComponent } from './pedidos/recolhimento-pedido/recolhimento-pedido.component';
import { PedidosFuncionarioModule } from './pedidos/pedidos-funcionario.module';



@NgModule({
  imports: [
    CommonModule,
    RoupaModule,
    RelatoriosModule,
    FuncionariosModule,
    PedidosFuncionarioModule
  ],
})
export class PerfilFuncionarioModule { }
