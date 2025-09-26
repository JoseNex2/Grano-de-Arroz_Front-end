import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ClientService } from '../../../../../../core/services/clients/client-service';
import { ClientInterface } from '../../../../../../core/interfaces/clientinterface';
import {ClientsResponse} from "../../../../../../core/interfaces/client/ClientResponse";
import {ApiResponse} from "../../../../../../core/interfaces/api-response";
import { MenuItem } from 'primeng/api';
import { BatteryAssignModalComponent } from '../../../battery-assign-modal/battery-assign-modal.component';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';


@Component({
  selector: 'app-customer-table',
  imports: [CommonModule,FormsModule,TableModule,ButtonModule, MenuModule,BatteryAssignModalComponent,DialogModule],
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css'],
  standalone: true,
})
export class CustomerTableComponent implements OnInit {

  client: ClientInterface[] = [];

  showAssignModal = false;
  selectedClient: ClientInterface | null = null;
  

  constructor(private readonly router: Router, private readonly clientService: ClientService) {}

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.clientService.getClients().subscribe({
      next: (res: ApiResponse<ClientsResponse>) => {  // 👈 tipar bien
        if (res.code === 200 && res.response?.clients) {
          this.client = res.response.clients;
          this.client = [...this.client].reverse();
        }
      },
      error: (err) => {
        console.error('Error cargando clientes:', err);
      }
    });
  }


  goToRegister() {
    this.router.navigate(['/main/registro-de-clientes']);
  }

  searchValue: string = '';

 getRowMenuItems(c: any): MenuItem[] {
    return [
      { label: 'Editar', icon: 'pi pi-pencil', command: () => this.onEdit(c) },
      { label: 'Eliminar', icon: 'pi pi-trash', command: () => this.onDelete(c) },
      { label: 'Asociar batería', icon: 'pi pi-plus-circle', command: () => this.onAssociateBattery(c) },
    ];
  }

  onEdit(c:any) {console.log('Editar cliente:', c);

  }

  onDelete(c:any) {console.log('Eliminar cliente:', c);

  }

  onAssociateBattery(c:any) {console.log('Asociar batería a cliente:', c);
    this.selectedClient = c;
    this.showAssignModal = true;
  }

  onMenuButtonClick(event: MouseEvent, menu: Menu) {
    event.preventDefault();
    event.stopPropagation();
    menu.toggle(event);
  }
}
