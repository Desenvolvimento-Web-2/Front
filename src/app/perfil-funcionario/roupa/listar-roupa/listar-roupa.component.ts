import { Component, OnInit } from '@angular/core';
import { RoupaService } from '../services/roupa.service';
import { Roupa } from '../../../shared';

@Component({
  selector: 'app-listar-roupa',
  templateUrl: './listar-roupa.component.html'
})
export class ListarRoupaComponent implements OnInit{
  roupas: Roupa[] = [];
  constructor(private roupaService : RoupaService){ }

  ngOnInit(): void{
    this.roupas=[];
    this.listarTodos();
  }

  listarTodos(): Roupa[] {
    this.roupaService.listarTodos().subscribe({
      next: (data: Roupa[]) => {
        if(data == null) {
          this.roupas = [];
        }
        else {
          this.roupas = data;
        }
      }
    });
    return this.roupas;
  }

  remover($event: any, roupa: Roupa): void {
    $event.preventDefault();
    if(confirm('Deseja realmente remover a peça "' + roupa.nome + '"?')){
      this.roupaService.remover(roupa.id!).subscribe({
        complete: () => {
          this.listarTodos();
        }
      });
    }
  }
}