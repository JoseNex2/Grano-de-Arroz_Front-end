import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../shared/breadcrumb/breadcrumb";
import {TitlesSubtitlesComponent} from "../../shared/titles-subtitles/titles-subtitles.component";
import {BreadcrumbItem} from "../../../../core/interfaces/breadcrumbitem";
import {
  EvaluationStatusChartsComponent
} from "../home/home-components/evaluation-status-charts/evaluation-status-charts.component";

@Component({
  selector: 'metricas-generales',
  imports: [
    BreadcrumbComponent,
    TitlesSubtitlesComponent,
    EvaluationStatusChartsComponent
  ],
  templateUrl: './general-stats.component.html',
  styleUrl: './general-stats.component.css'
})
export class GeneralStatsComponent {
  steps: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/inicio' },
    { label: 'Metricas Generales'}
  ];
}
