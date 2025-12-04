import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../shared/breadcrumb/breadcrumb";
import {TitlesSubtitlesComponent} from "../../shared/titles-subtitles/titles-subtitles.component";
import {BreadcrumbItem} from "../../../../core/interfaces/breadcrumbitem";
import {
  EvaluationStatusChartsComponent
} from "../home/home-components/evaluation-status-charts/evaluation-status-charts.component";
import {SelledBatteryPieGraphComponent} from "../../shared/selled-battery-pie-graph/selled-battery-pie-graph.component";

@Component({
  selector: 'metricas-generales',
  imports: [
    BreadcrumbComponent,
    TitlesSubtitlesComponent,
    EvaluationStatusChartsComponent,
    SelledBatteryPieGraphComponent
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
