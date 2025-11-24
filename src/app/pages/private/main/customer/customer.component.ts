import { Component } from '@angular/core';
import {BreadcrumbComponent} from '../../shared/breadcrumb/breadcrumb';
import { BreadcrumbItem } from '../../../../core/interfaces/breadcrumbitem';
import {MenuItem} from 'primeng/api';
import {CustomerTableComponent} from "./components/customer-table/customer-table.component";
import {TitlesSubtitlesComponent} from "../../shared/titles-subtitles/titles-subtitles.component";

@Component({
  selector: 'app-perfil-cliente',
    imports: [
        BreadcrumbComponent,
        CustomerTableComponent,
        TitlesSubtitlesComponent
    ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
    standalone: true,
})
export class CustomerComponent {
  steps: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/inicio' },
    { label: 'Clientes' }
  ];
}
