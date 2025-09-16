import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb';
import { TitlesSubtitlesComponent } from '../../shared/titles-subtitles/titles-subtitles.component';
import { SearchReportFormComponent } from './components/search-report-form/search-report-form.component';

@Component({
  selector: 'app-search-report',
  imports: [SearchReportFormComponent,BreadcrumbComponent,TitlesSubtitlesComponent],
  templateUrl: './search-report.component.html',
  styleUrls: ['./search-report.component.css'],
  standalone: true
})
export class SearchReportComponent {
  steps: MenuItem[] = [{ label: 'Inicio' }, { label: 'Registro Historico' },{ label: 'Buscar Reporte' }];
}
