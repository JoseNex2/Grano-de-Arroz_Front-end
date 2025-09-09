import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../shared/breadcrumb/breadcrumb";
import {MenuItem} from 'primeng/api';
import {TitlesSubtitlesComponent} from '../../shared/titles-subtitles/titles-subtitles.component';
import {InputText} from 'primeng/inputtext';
import {CustomerRegistrationFormComponent} from './components/customer-registration-form/customer-registration-form.component';



@Component({
  selector: 'app-customer-registration',
  imports: [
    BreadcrumbComponent,
    TitlesSubtitlesComponent,
    InputText,
  CustomerRegistrationFormComponent
  ],
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css'],
  standalone: true,
})
export class CustomerRegistrationComponent {

  steps: MenuItem[] = [
    {label: 'Inicio'},
    {label: 'Clientes'},
    {label: 'Resgistro de clientes'}
  ]

}
