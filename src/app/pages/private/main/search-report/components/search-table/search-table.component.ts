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
  selector: 'app-search-table',
  imports: [TableModule, CommonModule, TagModule, Button],
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css'],
  standalone: true
})
export class SearchTableComponent implements OnInit {
  rows: any[] = [];

  constructor(private batteryService: BatteryService,
              private messageService: MessageService,
              private reportsService: ReportService) {
    effect(() => {
      const data = this.batteryService.batteriesByClientData();
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
    const s = (status || '').toString().trim().toLowerCase();
    switch (s) {
      case 'aprobado':
      case 'aprobada':
        return 'success';
      case 'desaprobado':
      case 'desaprobada':
      case 'revocado':
      case 'revocada':
      case 'rechazado':
      case 'rechazada':
        return 'danger';
      case 'pendiente':
      case 'por evaluar':
      case 'por_evaluar':
        return 'warning';
      default:
        return 'secondary';
    }
  }

  getStatusClasses(status: string): { [key: string]: boolean } {
    const s = (status || '').toString().trim();
    const lowerStatus = s.toLowerCase();
    
    return {
      'bg-green-100 text-green-700': lowerStatus === 'aprobado' || lowerStatus === 'aprobada',
      'bg-yellow-100 text-yellow-700': lowerStatus === 'pendiente' || lowerStatus === 'por evaluar' || lowerStatus === 'por_evaluar',
      'bg-red-100 text-red-700': lowerStatus === 'desaprobado' || lowerStatus === 'desaprobada' || lowerStatus === 'revocado' || lowerStatus === 'revocada' || lowerStatus === 'rechazado' || lowerStatus === 'rechazada',
      'bg-gray-100 text-gray-700': !(lowerStatus === 'aprobado' || lowerStatus === 'aprobada' || lowerStatus === 'pendiente' || lowerStatus === 'por evaluar' || lowerStatus === 'por_evaluar' || lowerStatus === 'desaprobado' || lowerStatus === 'desaprobada' || lowerStatus === 'revocado' || lowerStatus === 'revocada' || lowerStatus === 'rechazado' || lowerStatus === 'rechazada')
    };
  }
}
