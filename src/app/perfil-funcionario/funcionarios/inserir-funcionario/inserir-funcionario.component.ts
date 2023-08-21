import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import { FuncionarioService } from '../services/funcionario.service';

@Component({
  selector: 'app-inserir-funcionario',
  templateUrl: './inserir-funcionario.component.html'
})
export class InserirFuncionarioComponent implements OnInit {
  @ViewChild('formFuncionario') formFuncionario: NgForm;
  funcionario!: Funcionario;
  message: string;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.funcionario = new Funcionario();
  }

  inserir(): void {
    if (this.formFuncionario.form.valid) {
      const dataNascimento = new Date(this.formFuncionario.value['dataNascimento']+'T03:00').toISOString()
      this.funcionario.dataNascimento = dataNascimento
      this.funcionarioService.inserir(this.funcionario)
        .subscribe((funcionario) => {
          if (funcionario != null) {
            this.router.navigate( ["/funcionario/listar"] );
          } else {
            this.message = 'Erro ao cadastrar funcionário';
          }
        });
    }
  }
}