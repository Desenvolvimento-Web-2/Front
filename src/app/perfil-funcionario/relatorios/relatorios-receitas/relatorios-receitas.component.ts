import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RelatorioService } from '../services/relatorio.service';

interface IReceita {
  data: string;
  valorRecebido: string;
}

@Component({
  selector: 'app-relatorios-receitas',
  templateUrl: './relatorios-receitas.component.html'
})
export class RelatorioReceitasComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;
  receitas: IReceita[] = [
    {
      data: '09/05/2023',
      valorRecebido: 'R$ 643,80',
    },
    {
      data: '08/05/2023',
      valorRecebido: 'R$ 526,50',
    },
    {
      data: '07/05/2023',
      valorRecebido: 'R$ 622,50',
    },
    {
      data: '06/05/2023',
      valorRecebido: 'R$ 356,70',
    },
  ];
  toFilterReceitas: IReceita[] = this.receitas;

  constructor(private readonly relatorioService: RelatorioService) { }

  ngOnInit(): void {

  }

  gerarRelatorioReceitas() {
    const headers = ['Data', 'Valor Recebido'];
    const data: string[][] = this.receitas.map(receita => [
      receita.data, receita.valorRecebido
    ]);
    this.relatorioService.gerarPDF(headers, data);
  }

  filterByDate() {
    // resetando no array de receitas filtradas
    this.toFilterReceitas = this.receitas;

    let hoje = new Date().toLocaleDateString();
    hoje = hoje.split('/').reverse().join('-');

    const dataInicial = (document.getElementById('dataInicial') as HTMLInputElement).value;
    const dataFinal = (document.getElementById('dataFinal') as HTMLInputElement).value;

    if (!dataInicial || !dataFinal) {
      alert('Por favor, preencha os campos de data');
      return;
    } else if (dataInicial > dataFinal) {
      alert('Data inicial não pode ser maior que a data final');
      return;
    } else if (dataInicial > hoje) {
      alert('Data inicial não pode ser maior que a data atual');
      return;
    }

    // filtrando por data desde a data inicial até a data final
    this.toFilterReceitas = this.toFilterReceitas.filter(receita => {
      const dataReceita = receita.data.split('/').reverse().join('-');
      return dataReceita >= dataInicial && dataReceita <= dataFinal;
    });

    if (this.toFilterReceitas.length === 0) {
      this.toFilterReceitas.push({
        data: 'Nenhum resultado encontrado',
        valorRecebido: '',
      });
    }
  }

  resetFilterByDate() {
    this.toFilterReceitas = this.receitas;
  }
}