import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FuncionarioService } from '../services/funcionario.service';
import { Funcionario } from 'src/app/shared/models/funcionario.model';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html'
})
export class EditarFuncionarioComponent implements OnInit{
  @ViewChild("formFuncionario") formFuncionario: NgForm;
  funcionario: Funcionario = {
    dataNascimento: "",
    email: "",
    nome: "",
  };
  message: string;
  constructor (
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
      this.funcionarioService.buscarPorId(id).subscribe(
        res=> { 
          if(res){
            const dataNascimento = res.dataNascimento!;
          this.funcionario = res;
            this.funcionario.dataNascimento = this.funcionarioService.formatarData(dataNascimento);
          }
          else 
            throw new Error ("Funcionário não encontrado: id = " + id);
        }
      )
  }

  atualizar(): void {
    if (this.formFuncionario.form.valid) {
      console.log(this.funcionario);
      this.funcionarioService.atualizar(this.funcionario).subscribe((funcionario) => {
        if (funcionario != null) {
          this.router.navigate( ["/funcionario/listar"] );
        } else {
          this.message = 'Erro ao atualizar funcionário';
        }
      });;
    }
  }
}
