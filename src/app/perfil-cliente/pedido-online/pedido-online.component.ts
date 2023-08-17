import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrcamentoService } from "../orcamentos/orcamentos.service";
import { PedidosService } from '../../shared';
import { Roupa } from '../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-online',
  templateUrl: './pedido-online.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PedidoOnlineComponent implements OnInit {
  roupas: Roupa[] = [];
  items: any[] = [];
  pedidoOnlineForm: FormGroup;

  constructor(
    private router: Router, 
    private orcamentoService: OrcamentoService, 
    private fb: FormBuilder, 
    private pedidosService: PedidosService
  ) {}

  ngOnInit(): void { 
    this.pedidoOnlineForm = this.fb.group({
      roupas: new FormArray([])
    });
    this.orcamentoService.getRoupas().subscribe((response) => {
      this.roupas = response
    });
    this.items = []
  }

  get roupasFormArray(): FormArray {
    return this.pedidoOnlineForm.get('roupas') as FormArray;
  }

  onSubmit() {
    const form = this.pedidoOnlineForm.value;
    const pedido = {
      roupas: form.roupas.map((item: any) => ({ id: item.id, quantidade: item.quantidade }))
    };

    this.pedidosService.inserir(pedido).subscribe((response) => {
      this.router.navigateByUrl('/pedido/orcamento', {
        state: { valor: response.precoTotal, prazo: response.prazo, id: response.id },
      });
    });
  }


  adicionarItem(event: Event): void {
    event.preventDefault();
    this.items.push({});
    this.roupasFormArray.push(this.fb.group({
      id: new FormControl("Selecione o tipo da roupa"),
      quantidade: new FormControl(),
      prazo: new FormControl(),
    }));
  }

  removerItem(event: Event): void {
    event.preventDefault();
    this.items.pop();
    this.roupasFormArray.removeAt(this.roupasFormArray.length - 1);
  }
}
