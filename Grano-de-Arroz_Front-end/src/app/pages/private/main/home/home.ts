import { Component } from '@angular/core';
import { WelcomeCardComponent } from '../../shared/welcome-card/welcome-card.component';
import { BatteryCardComponent } from '../../shared/battery-card/battery-card.component';
import { HistoryTableComponent } from '../../shared/history-table/history-table.component';

@Component({
  selector: 'app-home',
  imports: [WelcomeCardComponent, BatteryCardComponent, HistoryTableComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
})
export class Home {}
