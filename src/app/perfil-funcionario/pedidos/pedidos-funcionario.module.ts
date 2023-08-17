import { NgModule } from "@angular/core";
import { FuncionarioPedidoTableComponent } from "./funcionario-pedido-table/funcionario-pedido-table.component";
import { VisualizacaoPedidoComponent } from "./visualizacao-pedido/visualizacao-pedido.component";
import { PaginaInicialFuncionarioComponent } from "./pagina-inicial-funcionario/pagina-inicial-funcionario.component";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    FuncionarioPedidoTableComponent,
    VisualizacaoPedidoComponent,
    PaginaInicialFuncionarioComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class PedidosFuncionarioModule { }
