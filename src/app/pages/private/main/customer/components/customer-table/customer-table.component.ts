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


@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [CommonModule,FormsModule,TableModule,ButtonModule],
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {

  client: ClientInterface[] = [];
  

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
}
