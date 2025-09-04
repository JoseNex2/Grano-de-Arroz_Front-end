import { Component } from '@angular/core';
import { WelcomeCardComponent } from './home-components/welcome-card/welcome-card.component';
import { BatteryCardComponent } from './home-components/battery-card/battery-card.component';
import { HistoryTableComponent } from '../../shared/history-table/history-table.component';

@Component({
  selector: 'app-home',
  imports: [WelcomeCardComponent, BatteryCardComponent, HistoryTableComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
})
export class Home {}
