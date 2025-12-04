import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { BatteryService } from '../../../../../../core/services/battery/battery-service';

@Component({
  selector: 'app-evaluation-status-charts',
  templateUrl: './evaluation-status-charts.component.html',
  standalone: true
})
export class EvaluationStatusChartsComponent implements OnInit, OnChanges {
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

    // Colores del gráfico
    const approvedColor = '#A3D064'; // verde
    const rejectedColor = '#EF5B5B'; // rojo

    // conic-gradient: [approved 0->approved%] y [rejected approved%->100%]
    this.gradient = `conic-gradient(${approvedColor} 0% ${approved}%, ${rejectedColor} ${approved}% 100%)`;
  }

  private getPercents(): void {
    this.batteryService.getPercentsOfAnalisis().subscribe((res: any) => {
      this.evaluadasPct = res?.response?.approvedPercentage ?? 0;
      this.desaprobadas = res?.response?.rejectedPercentage ?? (100 - this.evaluadasPct);
      this.updateGradient();
    });
  }
}
