import { Component } from '@angular/core';
import { TitlesSubtitlesComponent } from "../../shared/titles-subtitles/titles-subtitles.component";
import { Step, StepList, StepPanel, StepPanels, Stepper } from "primeng/stepper";
import { ReportChartComponent } from "./report-chart/report-chart.component";
import { StepperActionsComponent } from "./stepper-actions/stepper-actions.component";
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ReportService } from '../../../../core/services/reports/reportService';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'analizar-bateria',
  imports: [
    TitlesSubtitlesComponent,
    Stepper,
    StepList,
    StepPanels,
    StepPanel,
    Step,
    ReportChartComponent,
    StepperActionsComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './stepper-lab.component.html',
  styleUrl: './stepper-lab.component.css',
  standalone: true,
})
export class StepperLabComponent {
  measurementsForm: FormGroup;

  constructor(private fb: FormBuilder, private reportService: ReportService, private messageService: MessageService, private router: Router) {
    this.measurementsForm = this.fb.group({
      tension: this.fb.group({ estado: ['aprobado'], comentario: [''] }),
      temperatura: this.fb.group({ estado: ['aprobado'], comentario: [''] }),
      densidad: this.fb.group({ estado: ['aprobado'], comentario: [''] }),
      resistencia: this.fb.group({ estado: ['aprobado'], comentario: [''] }),
      cca: this.fb.group({ estado: ['aprobado'], comentario: [''] })
    });
  }

  private extractReportId(analysis: any): number | null {
    const candidates = [
      analysis?.ReportId, analysis?.reportId, analysis?.Id, analysis?.id, analysis?.ID,
      analysis?.report?.ReportId, analysis?.report?.id, analysis?.report?.Id
    ].filter(v => v != null);
    if (candidates.length === 0) return null;
    const first = candidates[0];
    const n = Number(first);
    return Number.isFinite(n) ? n : null;
  }

  private mapEstadoToStatus(estado: string): 'aprobado' | 'desaprobado' {
    const e = (estado || '').toLowerCase();
    if (e === 'desaprobado') return 'desaprobado';
    // Default and any other value -> aprobado
    return 'aprobado';
  }

  getPreviewData(): Array<{ nombre: string; estado: string; comentario: string }> {
    const raw = this.measurementsForm.value as any;
    const paramNames: Record<string, string> = {
      tension: 'Tensión',
      temperatura: 'Temperatura',
      densidad: 'Densidad',
      resistencia: 'Resistencia',
      cca: 'CCA'
    };

    return Object.keys(paramNames).map(key => {
      const group = raw[key] || {};
      const estado = (group.estado || 'aprobado').toString().toLowerCase();
      const estadoDisplay = estado === 'desaprobado' ? 'Desaprobado' : 'Aprobado';
      
      return {
        nombre: paramNames[key],
        estado: estadoDisplay,
        comentario: group.comentario || ''
      };
    });
  }

  onSubmitFinal(): void {
    if (this.measurementsForm.invalid) return;

    const analysis = this.reportService.currentAnalisis();
    const reportId = this.extractReportId(analysis);

    const raw = this.measurementsForm.value as any;

    // Map each grupo a Measurement item según el contrato del backend
    const items = [
      { key: 'tension', id: 1 },
      { key: 'temperatura', id: 2 },
      { key: 'densidad', id: 3 },
      { key: 'resistencia', id: 4 },
      { key: 'cca', id: 5 }
    ] as const;

    const Measurements = items.map(({ key, id }) => {
      const g = raw[key] || {};
      return {
        MeasurementId: id,
        Status: this.mapEstadoToStatus(g.estado),
        Coment: g.comentario ?? ''
      };
    });

    // Determinar estado del reporte: nunca 'revocado', solo 'Aprobado' o 'Desaprobado'
    const hasDesaprobado = Measurements.some(m => m.Status === 'desaprobado');
    const ReportState = hasDesaprobado ? 'Desaprobado' : 'Aprobado';

    const body = {
      ReportId: reportId,
      MeasurementsState: Measurements,
      ReportState
    } as any;

    this.reportService.updateMeasurementReport(body).subscribe({
      next: (res: any) => {
        if (res?.code === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Reporte actualizado correctamente',
            life: 3000
          });
          void this.router.navigate(['/inicio']);
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atención',
            detail: res?.message || 'No se pudo actualizar el reporte',
            life: 3000
          });
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al actualizar el reporte',
          life: 3000
        });
      }
    });
  }
}
