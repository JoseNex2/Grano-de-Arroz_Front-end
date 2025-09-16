import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TitlesSubtitlesComponent } from '../../../../shared/titles-subtitles/titles-subtitles.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-table',
  imports: [TitlesSubtitlesComponent,TableModule,CommonModule,TagModule],
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css']
})
export class SearchTableComponent {
  rows = [
  { cliente: 'Milagros Palomeque', gda: '0001', estado: 'Pendiente', severity: 'secondary', fecha: '04/08/2025' },
  { cliente: 'Milagros Palomeque', gda: '0001', estado: 'Revocada',  severity: 'danger',    fecha: '04/08/2025' },
  { cliente: 'Milagros Palomeque', gda: '0001', estado: 'Aprobada',  severity: 'success',   fecha: '04/08/2025' },
];
}
