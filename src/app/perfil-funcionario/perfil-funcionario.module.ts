import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoupaModule } from './roupa/roupa.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
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
