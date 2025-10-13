import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('rowMenu') rowMenu!: Menu;

  client: ClientInterface[] = [];

  showAssignModal = false;
  selectedClient: ClientInterface | null = null;
  menuItems: MenuItem[] = [];
  

  constructor(private readonly router: Router, private readonly clientService: ClientService) {}

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.clientService.getClients().subscribe({
      next: (res: ApiResponse<ClientsResponse>) => {
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
    this.router.navigate(['/inicio/clientes/registro-de-clientes']);
  }

  searchValue: string = '';

  getRowMenuItems(client: ClientInterface): MenuItem[] {
    return [
      { 
        label: 'Editar', 
        icon: 'pi pi-pencil', 
        command: () => {
          this.onEdit(client);
        }
      },
      { 
        label: 'Asociar batería', 
        icon: 'pi pi-plus-circle', 
        command: () => {
          this.onAssociateBattery(client);
        }
      },
    ];
  }

  onEdit(client: ClientInterface) {
    // Navegar al formulario de registro con los datos del cliente para editar
    this.router.navigate(['/inicio/clientes/registro-de-clientes'], {
      queryParams: { 
        edit: true, 
        id: client.id,
        name: client.name,
        lastname: client.lastName,
        email: client.email,
        nationalId: client.nationalId,
        phoneNumber: client.phoneNumber
      }
    });
  }

  onAssociateBattery(client: ClientInterface) {
    console.log('Asociar batería a cliente:', client);
    this.selectedClient = client;
    this.showAssignModal = true;
  }

  onMenuButtonClick(event: MouseEvent, client: ClientInterface) {
    event.preventDefault();
    event.stopPropagation();
    
    // Configurar los items del menú para el cliente específico
    this.menuItems = this.getRowMenuItems(client);
    
    // Toggle del menú
    this.rowMenu.toggle(event);
  }
}