import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';




@NgModule({
  imports: [
    CommonModule,
    RelatoriosModule,
    FuncionariosModule,
  ],
})
export class PerfilFuncionarioModule { }
