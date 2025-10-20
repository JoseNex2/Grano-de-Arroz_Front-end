import { Component } from '@angular/core';
import {BreadcrumbComponent, BreadcrumbItem} from '../../shared/breadcrumb/breadcrumb';
import {MenuItem} from 'primeng/api';
import {CustomerTableComponent} from "./components/customer-table/customer-table.component";

@Component({
  selector: 'app-customer',
    imports: [
        BreadcrumbComponent,
        CustomerTableComponent
    ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  steps: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/inicio' },
    { label: 'Clientes' } // Página actual
  ];
}
