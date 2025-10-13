import {Component, effect, OnInit} from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import {BatteryService} from "../../../../../../core/services/battery/battery-service";

@Component({
  selector: 'app-search-table',
  imports: [TableModule, CommonModule, TagModule],
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css'],
  standalone: true
})
export class SearchTableComponent implements OnInit {
  rows: any[] = [];

  constructor(private batteryService: BatteryService) {
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
