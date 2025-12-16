import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from "../../shared/breadcrumb/breadcrumb";
import { TitlesSubtitlesComponent } from "../../shared/titles-subtitles/titles-subtitles.component";
import { BreadcrumbItem } from "../../../../core/interfaces/breadcrumbitem";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ReportService } from "../../../../core/services/reports/reportService";
import { ApiResponse } from "../../../../core/interfaces/api-response";

@Component({
  selector: 'registros-historicos',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    TitlesSubtitlesComponent,
    TableModule,
    TagModule,
    CommonModule
  ],
  providers: [DatePipe],
  templateUrl: './report-history.component.html',
  styleUrl: './report-history.component.css'
})
export class ReportHistoryComponent implements OnInit {
  @Input() showHeader: boolean = true;
  steps: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/inicio' },
    { label: 'Registro Histórico'},
  ];

  reports: Array<{
    odt: string;
    batteryType: string;
    client: string;
    evaluationDate: string;
    status: string;
    severity: string;
  }> = [];

  loading = false;

  constructor(private reportService: ReportService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.fetchReportHistory();
  }

  fetchReportHistory(): void {
    this.loading = true;
    this.reportService.getAllReports().subscribe({
      next: (res: ApiResponse<any>) => {
        const list = Array.isArray(res?.response) ? res?.response : (res?.response ?? res ?? []);
        this.reports = this.mapReports(list);
        this.loading = false;
      },
      error: () => {
        this.reports = [];
        this.loading = false;
      }
    });
  }

  private mapReports(list: any[]): Array<{
    odt: string;
    batteryType: string;
    client: string;
    evaluationDate: string;
    status: string;
    severity: string;
  }> {
    return list.map((item: any) => {
      const odt = item.chipId ?? '-';
      const batteryType = item.typeBattery ?? '-';
      const clientName = item.ClientName ?? item.clientName ?? item.client?.name ?? '';
      const clientLast = item.ClientLastName ?? item.clientLastName ?? item.client?.lastName ?? '';
      const evaluationDateRaw = item.reportDate ?? null;
      const evaluationDate = evaluationDateRaw
        ? (this.datePipe.transform(evaluationDateRaw, 'dd/MM/yyyy') ?? evaluationDateRaw)
        : '-';
      const status = (item.reportState ?? 'Pendiente').toString();

      return {
        odt: odt || '-',
        batteryType: batteryType || '-',
        client: `${clientName} ${clientLast}`.trim() || '-',
        evaluationDate,
        status,
        severity: this.getSeverity(status)
      };
    });
  }

  private getSeverity(status: string): string {
    const normalized = (status || '').toLowerCase();
    switch (normalized) {
      case 'aprobado':
      case 'aprobada':
        return 'success';
      case 'desaprobado':
      case 'revocado':
        return 'danger';
      case 'pendiente':
        return 'warning';
      default:
        return 'secondary';
    }
  }
}
