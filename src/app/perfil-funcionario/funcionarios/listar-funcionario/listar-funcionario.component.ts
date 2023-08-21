import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../services/funcionario.service';
import { Funcionario } from 'src/app/shared/models/funcionario.model';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html'
})
export class ListarFuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  constructor(
    private funcionarioService : FuncionarioService
  ){ }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): void {
    this.funcionarioService.listarTodos().subscribe({
      next: (data: Funcionario[]) => {
        if (data == null) {
          this.funcionarios = [];
        } else {
          this.funcionarios = data;
        }
      }
    });
  }


  remover($event: any, funcionario: Funcionario): void{
    $event.preventDefault();
    if(confirm(`Deseja realmente remover o funcionario ${funcionario.nome}?`)){
      this.funcionarioService.remover(funcionario.id!).subscribe({
        complete: () => { this.listarTodos(); }
        });
    }
  }

}
