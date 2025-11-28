import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BatteryService} from "../../../../core/services/battery/battery-service";

@Component({
  selector: 'app-selled-battery-pie-graph',
  imports: [],
  templateUrl: './selled-battery-pie-graph.component.html',
  styleUrl: './selled-battery-pie-graph.component.css'
})

  export class SelledBatteryPieGraphComponent implements OnInit, OnChanges {
  @Input() aprobadas = 0; // porcentaje aprobadas (0-100)
  @Input() desaprobadas = 0; // porcentaje desaprobadas (0-100)

  constructor(private batteryService: BatteryService) {}
  gradient = '';
  evaluadasPct = 0;

  ngOnInit(): void {
    this.getPercents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (('aprobadas' in changes) || ('desaprobadas' in changes)) {
      this.evaluadasPct = this.aprobadas || 0;
      this.updateGradient();
    }
  }

  private updateGradient(): void {
    const approved = Math.max(0, Math.min(100, Math.round(this.evaluadasPct)));
    const rejected = 100 - approved;

    const approvedColor = '#0476D9'; // verde
    const rejectedColor = '#F2B705'; // rojo

    this.gradient = `conic-gradient(${approvedColor} 0% ${approved}%, ${rejectedColor} ${approved}% 100%)`;
  }

  private getPercents(): void {
    this.batteryService.getMetricsSelled().subscribe((res: any) => {
      this.evaluadasPct = res?.response?.soldPercentage ?? 0;
      this.desaprobadas = res?.response?.soldWithReportPercentage ?? (100 - this.evaluadasPct);
      this.updateGradient();
    });
  }
}
