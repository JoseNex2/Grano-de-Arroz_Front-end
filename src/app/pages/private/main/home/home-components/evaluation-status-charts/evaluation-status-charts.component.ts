import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-evaluation-status-charts',
  templateUrl: './evaluation-status-charts.component.html',
})
export class EvaluationStatusChartsComponent implements OnInit, OnChanges {
  @Input() evaluadas = 75;
  @Input() pendientes = 25; 

  gradient = '';    
  evaluadasPct = 0;  

  ngOnInit(): void {
    this.updateGradient();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.updateGradient();
  }

  private updateGradient(): void {
    const total = Math.max(this.evaluadas + this.pendientes, 1);
    this.evaluadasPct = Math.round((this.evaluadas / total) * 100);
    const start = this.evaluadasPct; 
    this.gradient = `conic-gradient(#A3D064 0% ${start}%, #EF5B5B ${start}% 100%)`;
  }
}
