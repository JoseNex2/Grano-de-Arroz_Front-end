import { Component } from '@angular/core';
import {BreadcrumbComponent} from '../../shared/breadcrumb/breadcrumb';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-customer',
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  steps: MenuItem[] = [
    {label: 'Inicio'},
    {label: 'Clientes'}
  ]

}
