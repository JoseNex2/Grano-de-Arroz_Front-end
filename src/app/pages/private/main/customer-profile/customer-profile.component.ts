import {Component, effect, OnInit} from '@angular/core';
import {BreadcrumbComponent} from "../../shared/breadcrumb/breadcrumb";
import {TitlesSubtitlesComponent} from "../../shared/titles-subtitles/titles-subtitles.component";
import {BreadcrumbItem} from "../../../../core/interfaces/breadcrumbitem";
import { ClientStore } from '../../../../core/stores/client-store';
import { ClientService } from '../../../../core/services/clients/client-service';
import {InputText, InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {BatteryService} from "../../../../core/services/battery/battery-service";
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-customer-profile',
  imports: [
    BreadcrumbComponent,
    TitlesSubtitlesComponent,
    InputText,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    Button,
    TableModule,
    CommonModule
  ],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent implements OnInit {

  steps: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/inicio' },
    { label: 'Clientes' },
    { label: 'Perfil del cliente'}
  ];

  client: any = null;
  initials: string = '';
  batteries: any[] = [];
  searchValue: string = '';

  constructor(
    private readonly clientStore: ClientStore,
    private readonly clientService: ClientService,
    private readonly batteryService: BatteryService
  ) {
    effect(() => {
      const id = this.clientStore.selectedClientId();
      if (id !== null) {
        this.clientService.getClientById(id).subscribe(res => {
          this.client = res?.response ?? res;
          this.initials = this.getInitials(this.client?.name, this.client?.lastName);
          this.batteryService.getBatteriesByUserId(id).subscribe({
            next: (res) => {
              const list = res?.response ?? [];
              const allBatteries = Array.isArray(list) ? list : [];
              // Limitar a 7 baterías
              this.batteries = allBatteries.slice(0, 7);
            },
            error: (err) => {
              console.error('Error al obtener baterías:', err);
              this.batteries = [];
            }
          });
        });
      } else {
        this.client = null;
        this.initials = '';
        this.batteries = [];
      }
    });
  }

  ngOnInit() {
    //
  }

  getInitials(name: string, lastname: string): string {
    const first = name?.trim().charAt(0).toUpperCase() || '';
    const last = lastname?.trim().charAt(0).toUpperCase() || '';
    return `${first}${last}`;
  }

}
