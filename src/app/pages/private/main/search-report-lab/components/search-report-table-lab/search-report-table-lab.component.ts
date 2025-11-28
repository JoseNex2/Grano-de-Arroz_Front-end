import {Component, effect, OnInit} from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import {Button} from "primeng/button";
import {ReportService} from "../../../../../../core/services/reports/reportService";
import {ApiResponse} from "../../../../../../core/interfaces/api-response";
import {MessageService} from "primeng/api";
import { Router } from '@angular/router';


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
              private reportsService: ReportService,
              private router: Router) {
    effect(() => {
      const data = this.reportService.reportsByData();
      const list = Array.isArray(data)
          ? data
          : (data?.batteries ?? data?.clients ?? data?.reports ?? []);

      if (Array.isArray(list) && list.length > 0) {
        const mapped = list.map((b: any) => {
          const fullNameRaw = (
            b.ClientFullName ?? b.clientFullName ?? b.fullName ?? b.client_full_name ?? b.Client ?? b.clientNameFull
          );
          const fullName = typeof fullNameRaw === 'string' ? fullNameRaw : null;

          const firstName = (
            b.ClientName ?? b.clientName ?? b.client?.name ?? b.client?.firstName ?? b.firstName ?? b.Name ?? b.name ?? ''
          );
          const lastName = (
            b.ClientLastName ?? b.clientLastName ?? b.client?.lastName ?? b.client?.surname ?? b.lastName ?? b.LastName ?? ''
          );
          const cliente = (fullName ?? `${firstName ?? ''} ${lastName ?? ''}`).toString().trim();

          const gda = b.ChipId ?? b.chipId ?? b.chipID ?? b.GDA ?? b.gda ?? b.id ?? '';

          const estadoRaw = b.reportState ?? 'Pendiente';
          const estado = typeof estadoRaw === 'string' ? estadoRaw : 'Pendiente';

          const fechaRaw = b.SaleDate ?? b.saleDate ?? b.ReportDate ?? b.reportDate ?? b.date ?? b.createdAt ?? null;
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
          setTimeout(() => { this.rows = mapped; });
      } else {
        // Defer clearing as well to keep updates outside current CD tick
        setTimeout(() => { this.rows = []; });
      }
    });
  }

  ngOnInit() {
    console.log(this.rows);
  }

  getIdReportToAnalize(reportId: string | number) {
    this.reportsService.getIdReportToAnalize(reportId).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.code === 200 || res.code === 201) {
          console.log('Datos del reporte:', res.response);
          this.reportService.currentAnalisis.set(res.response);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Reporte obtenido correctamente',
            life: 3000
          });
          void this.router.navigate(['/inicio/analizar-bateria']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message || 'No se pudo obtener el reporte',
            life: 3000
          });
        }
      },
    });
  }

  getSeverity(status: string): string {
    const s = (status || '').toString().toLowerCase();
    switch (s) {
      case 'Aprobado': return 'success';
      case 'Desaprobado': return 'danger';
      case 'pendiente': return 'warning';
      default: return 'secondary';
    }
  }
}
