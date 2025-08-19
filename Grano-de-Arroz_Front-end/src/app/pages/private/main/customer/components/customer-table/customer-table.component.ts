import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import { Component } from '@angular/core';

export interface User {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  bateria: string;
  codigo: number;
}

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [
    FormsModule,
    TableModule
  ],
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent {

  usuarios: User[] = [
    { nombre: 'Andrés', apellido: 'Moises', dni: '41414141', email: 'andres@mail.com', bateria: 'Yuasa YTX9-BS', codigo: 100234 },
    { nombre: 'Lucía', apellido: 'Gómez', dni: '32456789', email: 'lucia@mail.com', bateria: 'Moura MA12-D', codigo: 100987 },
    { nombre: 'Juan', apellido: 'Pérez', dni: '28987654', email: 'juan@mail.com', bateria: 'Bosch BTX7L', codigo: 101345 },
    { nombre: 'Martina', apellido: 'López', dni: '41234567', email: 'martina@mail.com', bateria: 'Varta VTX9', codigo: 102456 },
    { nombre: 'Diego', apellido: 'Fernández', dni: '39876543', email: 'diego@mail.com', bateria: 'Interstate CYTX14', codigo: 103876 }
  ];

  searchValue: string = '';
}
