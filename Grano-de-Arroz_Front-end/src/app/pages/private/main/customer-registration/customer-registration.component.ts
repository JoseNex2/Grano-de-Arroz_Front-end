import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../shared/breadcrumb/breadcrumb";
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-customer-registration',
    imports: [
        BreadcrumbComponent
    ],
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.css',
  standalone: true,
})
export class CustomerRegistrationComponent {

  steps: MenuItem[] = [
    {label: 'Inicio'},
    {label: 'Clientes'},
    {label: 'Resgistro de clientes'}
  ]

}
