import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../shared/breadcrumb/breadcrumb";
import { BreadcrumbItem } from '../../../../core/interfaces/breadcrumbitem';
import {MenuItem} from 'primeng/api';
import {TitlesSubtitlesComponent} from '../../shared/titles-subtitles/titles-subtitles.component';
import {CustomerRegistrationFormComponent} from './components/customer-registration-form/customer-registration-form.component';



@Component({
  selector: 'app-customer-registration',
  imports: [
    BreadcrumbComponent,
    TitlesSubtitlesComponent,
  CustomerRegistrationFormComponent
  ],
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css'],
  standalone: true,
})
export class CustomerRegistrationComponent {

  steps: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/inicio' },
    { label: 'Clientes', route: '/inicio/clientes' },
    { label: 'Registro de clientes' } // Página actual
  ];

}
