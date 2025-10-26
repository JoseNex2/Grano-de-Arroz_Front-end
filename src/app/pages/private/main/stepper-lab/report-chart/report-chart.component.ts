import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgApexchartsModule,
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  ApexGrid,
  ApexLegend
} from 'ng-apexcharts';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  legend: ApexLegend;
};

@Component({
  selector: 'app-report-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './report-chart.component.html',
  styleUrls: ['./report-chart.component.css']
})
export class ReportChartComponent {
  @ViewChild('chart') chart?: ChartComponent;

  public chartOptions: ChartOptions = {
    series: [
      {
        name: 'Temperatura',
        data: [
          { x: new Date('2025-10-01T00:00:00').getTime(), y: 22 },
          { x: new Date('2025-10-01T03:00:00').getTime(), y: 21 },
          { x: new Date('2025-10-01T06:00:00').getTime(), y: 20 },
          { x: new Date('2025-10-01T09:00:00').getTime(), y: 25 },
          { x: new Date('2025-10-01T12:00:00').getTime(), y: 28 },
          { x: new Date('2025-10-01T15:00:00').getTime(), y: 27 },
          { x: new Date('2025-10-01T18:00:00').getTime(), y: 24 },
          { x: new Date('2025-10-01T21:00:00').getTime(), y: 23 },
          { x: new Date('2025-10-02T00:00:00').getTime(), y: 22 }
        ]
      }
    ],
    chart: {
      type: 'line',
      height: 350,
      width: 650,
      animations: { enabled: true },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    markers: { size: 0 },
    title: { text: 'Tensión', align: 'left' },
    fill: { type: 'solid' },
    yaxis: { title: { text: 'Valor' } },
    xaxis: {
      type: 'datetime',
      title: { text: 'Tiempo' }
    },
    tooltip: { x: { format: 'dd MMM HH:mm' } },
    grid: { strokeDashArray: 3 },
    legend: { position: 'top' }
  };
}
