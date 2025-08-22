import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

export interface User {
  nombre: string;
  apellido: string;
  dni: string;
  rol: string;
}

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  standalone: true,
})
export class UserTableComponent {
  usuarios: User[] = [
    {
      nombre: 'Andrés',
      apellido: 'Moises',
      dni: '41414141',
      rol: 'Administrador',
    },
    {
      nombre: 'Andrés',
      apellido: 'Moises',
      dni: '41414141',
      rol: 'Administrador',
    },
    {
      nombre: 'Andrés',
      apellido: 'Moises',
      dni: '41414141',
      rol: 'Administrador',
    },
    {
      nombre: 'Andrés',
      apellido: 'Moises',
      dni: '41414141',
      rol: 'Laboratorio',
    },
    {
      nombre: 'Andrés',
      apellido: 'Moises',
      dni: '41414141',
      rol: 'Laboratorio',
    },
    {
      nombre: 'Andrés',
      apellido: 'Moises',
      dni: '41414141',
      rol: 'Sucursal',
    },
  ];

  searchValue: string = '';
}
