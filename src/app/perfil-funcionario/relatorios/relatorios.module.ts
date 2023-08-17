import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioComponent } from './relatorios-clientes/relatorios-clientes.component';
import { RelatorioClientesFieisComponent } from './relatorios-clientes-fieis/relatorios-clientes-fieis.component';
import { RelatorioReceitasComponent } from './relatorios-receitas/relatorios-receitas.component';
import { RelatorioService } from './services/relatorio.service';


@NgModule({
  declarations: [
    RelatorioComponent,
    RelatorioClientesFieisComponent,
    RelatorioReceitasComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    RelatorioService
  ],
})
export class RelatoriosModule { }
