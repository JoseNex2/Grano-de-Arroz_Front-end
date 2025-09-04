import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-history-table',
  imports: [TableModule,FormsModule,CommonModule,InputTextModule],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.css',
  standalone: true,
})

export class HistoryTableComponent {
  search = '';
  rows = [
    { ot: '123', modelo: 'MODELO 123', cliente: 'Milagros Palomeque', fecha: '2017-05-13', status: 'EVALUADA' },
    { ot: '123', modelo: 'MODELO 123', cliente: 'Milagros Palomeque', fecha: '2017-05-13', status: 'EVALUADA' },
    { ot: '123', modelo: 'MODELO 123', cliente: 'Milagros Palomeque', fecha: '2017-05-13', status: 'POR EVALUAR' },
    { ot: '123', modelo: 'MODELO 123', cliente: 'Milagros Palomeque', fecha: '2017-05-13', status: 'POR EVALUAR' },
    { ot: '123', modelo: 'MODELO 123', cliente: 'Milagros Palomeque', fecha: '2017-05-13', status: 'POR EVALUAR' },
  ];

  get filteredRows() {
    const s = this.search?.toLowerCase() ?? '';
    if (!s) return this.rows;
    return this.rows.filter(r =>
      r.ot.toLowerCase().includes(s) ||
      r.modelo.toLowerCase().includes(s) ||
      r.cliente.toLowerCase().includes(s) ||
      r.fecha.toLowerCase().includes(s) ||
      r.status.toLowerCase().includes(s)
    );
  }
}