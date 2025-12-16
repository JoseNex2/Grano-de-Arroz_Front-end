import {Component, OnInit} from '@angular/core';
import { WelcomeCardComponent } from './home-components/welcome-card/welcome-card.component';
import { BatteryCardComponent } from './home-components/battery-card/battery-card.component';
import { ReportHistoryComponent } from '../report-history/report-history.component';
import {SalesCard} from "./home-components/sales-card/sales-card";
import {WelcomeLabComponent} from "./home-components/welcome-lab/welcome-lab.component";
import {
  EvaluationStatusChartsComponent
} from "./home-components/evaluation-status-charts/evaluation-status-charts.component";

@Component({
  selector: 'app-home',
    imports: [WelcomeCardComponent, BatteryCardComponent, ReportHistoryComponent, SalesCard, WelcomeLabComponent, EvaluationStatusChartsComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
})
export class Home implements OnInit{
  user = JSON.parse(localStorage.getItem('meUser')|| '{}');

 ngOnInit() {

 }

}
