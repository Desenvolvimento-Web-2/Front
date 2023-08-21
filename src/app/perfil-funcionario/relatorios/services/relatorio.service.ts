import { Injectable } from '@angular/core';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  public gerarPDF(headers: string[], rows: string[][]) {
    const doc = new jspdf('l', 'pt', 'a4');
    autoTable(doc, {
      head: [headers],
      body: rows
    })

    doc.save('relatorio.pdf');
  }
}