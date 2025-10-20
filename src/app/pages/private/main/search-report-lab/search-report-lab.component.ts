import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
import {BreadcrumbComponent} from "../../shared/breadcrumb/breadcrumb";
import {SearchReportFormComponent} from "../search-report/components/search-report-form/search-report-form.component";
import {SearchTableComponent} from "../search-report/components/search-table/search-table.component";
import {TitlesSubtitlesComponent} from "../../shared/titles-subtitles/titles-subtitles.component";
import {SearchReportTableLabComponent} from "./components/search-report-table-lab/search-report-table-lab.component";
import {SearchReportFormLabComponent} from "./components/search-report-form-lab/search-report-form-lab.component";

@Component({
  selector: 'app-search-report-lab',
  imports: [
    BreadcrumbComponent,
    SearchReportFormComponent,
    SearchTableComponent,
    TitlesSubtitlesComponent,
    SearchReportTableLabComponent,
    SearchReportFormLabComponent
  ],
  templateUrl: './search-report-lab.component.html',
  styleUrl: './search-report-lab.component.css',
  standalone: true,
})
export class SearchReportLabComponent {
  steps: MenuItem[] = [{ label: 'Inicio' }, { label: 'Registro Historico' },{ label: 'Generar Reporte' }];

}
