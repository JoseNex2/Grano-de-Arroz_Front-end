import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb';
import { TitlesSubtitlesComponent } from '../../shared/titles-subtitles/titles-subtitles.component';
import { SearchReportFormComponent } from './components/search-report-form/search-report-form.component';
import { SearchTableComponent } from './components/search-table/search-table.component';

@Component({
  selector: 'app-search-report',
  imports: [SearchReportFormComponent,BreadcrumbComponent,TitlesSubtitlesComponent,SearchTableComponent],
  templateUrl: './search-report.component.html',
  styleUrls: ['./search-report.component.css'],
  standalone: true
})
export class SearchReportComponent {
  steps: MenuItem[] = [{ label: 'Inicio' }, { label: 'Registro Historico' },{ label: 'Generar Reporte' }];
}
