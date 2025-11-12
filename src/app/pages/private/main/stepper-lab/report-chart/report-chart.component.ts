import { Component, ViewChild, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
import {BatteryService} from "../../../../../core/services/battery/battery-service";
import {ReportService} from "../../../../../core/services/reports/reportService";

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
export class ReportChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart?: ChartComponent;

  public chartOptions: ChartOptions = {
    series: [],
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

  @Input() magnitude: string = 'tension';
  private get normalizedMagnitude(): string {
    return this.normalizeMagnitude(this.magnitude);
  }

  constructor(private batteryService: BatteryService, private reportService: ReportService) {}

  private normalizeMagnitude(value: string): string {
    if (!value) return '';
    const lower = value.toLowerCase();
    const noAccents = lower.normalize('NFD').replace(/\p{Diacritic}+/gu, '');
    const lettersOnly = noAccents.replace(/[^a-z]/g, '');

    if (lettersOnly === 'tension' || lettersOnly === 'voltaje' || lettersOnly === 'voltage' || lettersOnly === 'volts') return 'tension';
    if (lettersOnly === 'temperatura' || lettersOnly === 'temp' || lettersOnly === 'temperature') return 'temperatura';
    if (lettersOnly === 'densidad' || lettersOnly === 'density') return 'densidad';
    if (lettersOnly === 'resistencia' || lettersOnly === 'resistance' || lettersOnly === 'internalresistance' || lettersOnly === 'resistenciainterna' || lettersOnly === 'ohm' || lettersOnly === 'mohm') return 'resistencia';
    if (lettersOnly === 'cca' || lettersOnly === 'coldcrankingamps' || lettersOnly === 'cranking' || lettersOnly === 'current' || lettersOnly === 'current') return 'cca';
    return lettersOnly;
  }

  private getLabelForMagnitude(): string {
    const m = this.normalizedMagnitude;
    switch (m) {
      case 'tension': return 'Tensión';
      case 'temperatura': return 'Temperatura';
      case 'densidad': return 'Densidad';
      case 'resistencia': return 'Resistencia';
      case 'cca': return 'CCA';
      default: return m ? m.charAt(0).toUpperCase() + m.slice(1) : 'Medición';
    }
  }

  private applyTitleFromMagnitude(): void {
    const label = this.getLabelForMagnitude();
    this.chartOptions = {
      ...this.chartOptions,
      title: { ...(this.chartOptions.title || {}), text: label }
    };
  }

  ngOnInit(): void {
    this.applyTitleFromMagnitude();
    this.loadChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['magnitude'] && !changes['magnitude'].firstChange) {
      // Update title and reload data for the new magnitude
      this.applyTitleFromMagnitude();
      this.loadChartData();
    }
  }

  private loadChartData(): void {
    const analysis = this.reportService.currentAnalisis();
    this.applyTitleFromMagnitude();

    const chipId = this.extractChipId(analysis);
    if (!chipId) {
      console.warn('[ReportChart] No ChipId found in current analysis. Chart series will be empty.');
      this.chartOptions.series = [];
      return;
    }

    this.batteryService.getBatteriesByDataFromChipId(chipId).subscribe({
      next: (res) => {
        if (!(res?.code === 200) || !res?.response) {
          console.warn('[ReportChart] Unexpected response while searching battery by ChipId.');
          this.chartOptions.series = [];
          return;
        }
        const list = Array.isArray(res.response) ? res.response : (res.response.batteries ?? res.response.items ?? []);
        const batteryIds = this.extractIdsFromBatteryList(list);
        if (batteryIds.length === 0) {
          this.chartOptions.series = [];
          return;
        }

        this.batteryService.getBatteriesById(batteryIds).subscribe({
          next: (res2) => {
            console.log('[ReportChart] getBatteriesById response =>', res2);
            if (res2?.code === 200 && res2?.response) {
              const resp: any = res2.response;
              const measurements = (
                resp.measurements ||
                resp.Measurements ||
                resp?.battery?.measurements ||
                resp?.battery?.Measurements ||
                (Array.isArray(resp) ? (resp[0]?.measurements || resp[0]?.Measurements) : null) ||
                []
              );
              const seriesData = this.mapTensionMeasurementsToSeries(measurements);
              const label = this.getLabelForMagnitude();
              this.chartOptions = {
                ...this.chartOptions,
                series: [
                  {
                    name: label,
                    data: seriesData
                  }
                ]
              };
            } else {
              console.warn('[ReportChart] Unexpected API response shape or code (getBatteriesById). Clearing series.');
              this.chartOptions.series = [];
            }
          },
          error: (err2) => {
            console.error('[ReportChart] Error calling getBatteriesById:', err2);
            this.chartOptions.series = [];
          }
        });
      },
      error: (err) => {
        console.error('[ReportChart] Error searching battery by ChipId:', err);
        this.chartOptions.series = [];
      }
    });
  }

  private extractChipId(analysis: any): string | null {
    if (!analysis) return null;
    const candidates: any[] = [];
    if (analysis?.ChipId) candidates.push(analysis.ChipId);
    if (analysis?.chipId) candidates.push(analysis.chipId);
    if (analysis?.ChipID) candidates.push(analysis.ChipID);
    if (analysis?.GDA) candidates.push(analysis.GDA);
    if (analysis?.gda) candidates.push(analysis.gda);
    if (analysis?.battery?.ChipId) candidates.push(analysis.battery.ChipId);
    if (analysis?.battery?.chipId) candidates.push(analysis.battery.chipId);

    const normalized = candidates
      .map(v => (v != null ? String(v).trim() : ''))
      .filter(v => v.length > 0);

    return normalized[0] ?? null;
  }

  private extractIdsFromBatteryList(list: any[]): string[] {
    if (!Array.isArray(list)) return [];
    const ids = list
      .map(b => b?.Id ?? b?.id ?? b?.ID ?? b?.batteryId ?? b?.BatteryId)
      .filter(v => v != null)
      .map(v => String(v));
    // de-duplicate and keep numeric-like if applicable
    const unique = Array.from(new Set(ids));
    return unique;
  }

  private mapTensionMeasurementsToSeries(measurements: any[]): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    if (!Array.isArray(measurements)) {
      console.warn('[ReportChart] mapTensionMeasurementsToSeries: measurements is not an array:', measurements);
      return points;
    }

    const target = this.normalizedMagnitude;

    const parseTs = (dateStr?: string, timeStr?: string | number): number => {
      const d = (dateStr || '').toString();
      const t = (timeStr ?? '').toString();
      const numeric = Number(timeStr);
      if (!isNaN(numeric) && numeric > 10_000_000_000) {
        return numeric; // assume ms
      }
      const iso = d && t ? `${d}T${t}` : (d || t);
      const ts = new Date(iso).getTime();
      return isNaN(ts) ? NaN : ts;
    };

    for (const m of measurements) {
      const magnitude = m?.magnitude || m?.Magnitude || m?.type || m?.Type || '';
      const mag = this.normalizeMagnitude(String(magnitude));
      if (mag !== target) continue;

      const dateStr = m?.measurementDate || m?.MeasurementDate || m?.date || m?.Date || '';

      const metrics = m?.metrics || m?.Metrics;
      if (metrics && typeof metrics === 'object') {
        Object.entries(metrics).forEach(([timeStr, value]) => {
          if (value == null || isNaN(Number(value))) return;
          const ts = parseTs(dateStr, timeStr);
          if (!isNaN(ts)) points.push({ x: ts, y: Number(value) });
        });
        continue;
      }

      const values = m?.values || m?.Values;
      const times = m?.times || m?.Times;
      if (Array.isArray(values)) {
        if (values.length && typeof values[0] === 'object') {
          for (const entry of values) {
            const v = entry?.value ?? entry?.Value ?? entry?.v;
            const t = entry?.time ?? entry?.Time ?? entry?.timestamp ?? entry?.Timestamp;
            if (v == null || isNaN(Number(v))) continue;
            const ts = parseTs(dateStr, t);
            if (!isNaN(ts)) points.push({ x: ts, y: Number(v) });
          }
        } else if (Array.isArray(times)) {
          for (let i = 0; i < values.length && i < times.length; i++) {
            const v = values[i];
            if (v == null || isNaN(Number(v))) continue;
            const ts = parseTs(dateStr, times[i]);
            if (!isNaN(ts)) points.push({ x: ts, y: Number(v) });
          }
        }
        continue;
      }

      const singleVal = m?.value ?? m?.Value ?? m?.reading ?? m?.Reading ?? m?.val ?? m?.Val;
      const time = m?.time ?? m?.Time ?? m?.timestamp ?? m?.Timestamp;
      if (singleVal != null && !isNaN(Number(singleVal))) {
        const ts = parseTs(dateStr, time);
        if (!isNaN(ts)) points.push({ x: ts, y: Number(singleVal) });
      }
    }

    points.sort((a, b) => a.x - b.x);
    return points;
  }
}
