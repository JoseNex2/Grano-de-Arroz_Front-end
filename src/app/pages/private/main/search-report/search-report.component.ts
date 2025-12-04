import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb';
import { BreadcrumbItem } from '../../../../core/interfaces/breadcrumbitem';
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
  steps: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/inicio' }, 
    { label: 'Registro Histórico', route: '/inicio/reportes' }, 
    { label: 'Buscar Reporte' } // Página actual
  ];
}
