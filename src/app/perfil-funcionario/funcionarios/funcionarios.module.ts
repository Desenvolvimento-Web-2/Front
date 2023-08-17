import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ListarFuncionarioComponent } from './listar-funcionario/listar-funcionario.component';
import { InserirFuncionarioComponent } from './inserir-funcionario/inserir-funcionario.component';
import { EditarFuncionarioComponent } from './editar-funcionario/editar-funcionario.component';
import { FuncionarioService } from './services/funcionario.service';

@NgModule({
  declarations: [
    ListarFuncionarioComponent,
    InserirFuncionarioComponent,
    EditarFuncionarioComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [
    FuncionarioService,
  ]
})
export class FuncionariosModule { }
