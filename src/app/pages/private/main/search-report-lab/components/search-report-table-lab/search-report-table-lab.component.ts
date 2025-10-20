import {Component, effect, OnInit} from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import {BatteryService} from "../../../../../../core/services/battery/battery-service";
import {Button} from "primeng/button";
import {ReportService} from "../../../../../../core/services/reports/reportService";
import {ApiResponse} from "../../../../../../core/interfaces/api-response";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-search-report-table-lab',
  imports: [TableModule, CommonModule, TagModule, Button],
  templateUrl: './search-report-table-lab.component.html',
  styleUrl: './search-report-table-lab.component.css',
  standalone: true
})
export class SearchReportTableLabComponent implements OnInit {
  rows: any[] = [];

  constructor(private reportService: ReportService,
              private messageService: MessageService,
              private reportsService: ReportService) {
    effect(() => {
      const data = this.reportService.reportsByData();
      const list = Array.isArray(data)
          ? data
          : (data?.batteries ?? data?.clients ?? []);

      if (Array.isArray(list) && list.length > 0) {
        this.rows = list.map((b: any) => {
          const firstName = b.ClientName ?? b.client?.name ?? b.name ?? '';
          const lastName = b.ClientLastName ?? b.client?.lastName ?? b.lastName ?? '';
          const cliente = `${firstName} ${lastName}`.trim();

          const gda = b.ChipId ?? b.chipId ?? b.gda ?? b.id ?? '';

          const estadoRaw = b.Status ?? b.status ?? 'Pendiente';
          const estado = typeof estadoRaw === 'string' ? estadoRaw : 'Pendiente';

          const fechaRaw = b.SaleDate ?? b.saleDate ?? b.date ?? b.createdAt ?? null;
          const fecha = fechaRaw ? new Date(fechaRaw).toLocaleDateString() : new Date().toLocaleDateString();

          return {
            id: b.Id ?? b.id ?? b.ID ?? '',
            cliente,
            gda,
            estado,
            severity: this.getSeverity(estado),
            fecha,
          };
        });
      } else {
        this.rows = [];
      }
    });
  }

  ngOnInit() {
    console.log(this.rows);
  }

  generateReport(chipId: string) {
    this.reportsService.generateReport(chipId).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.code === 200 || res.code === 201) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Reporte generado correctamente',
            life: 3000
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message || 'No se pudo generar el reporte',
            life: 3000
          });
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo generar el reporte. Intente nuevamente',
          life: 3000
        });
      },
    });
  }

  getSeverity(status: string): string {
    const s = (status || '').toString().toLowerCase();
    switch (s) {
      case 'aprobada': return 'success';
      case 'revocada': return 'danger';
      case 'pendiente': return 'warning';
      default: return 'secondary';
    }
  }
}
