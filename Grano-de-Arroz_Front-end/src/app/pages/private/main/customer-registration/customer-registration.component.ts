import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../../shared/breadcrumb/breadcrumb";
import {MenuItem} from 'primeng/api';
import {TitlesSubtitlesComponent} from '../../shared/titles-subtitles/titles-subtitles.component';
import {InputText} from 'primeng/inputtext';



@Component({
  selector: 'app-customer-registration',
  imports: [
    BreadcrumbComponent,
    TitlesSubtitlesComponent,
    InputText,
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
