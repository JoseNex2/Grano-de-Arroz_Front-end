import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {UserInterface} from '../../../../../../core/interfaces/userInterface';
import {Router} from '@angular/router';
import {UserService} from '../../../../../../core/services/users/user-service';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  standalone: true,
})
export class UserTableComponent implements OnInit{

  constructor(private readonly router: Router, private readonly userService:UserService) {}

  usuarios:  any[] = [];

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.usuarios = res.response;
        console.log(this.usuarios)
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }


  // usuarios: User[] = [
  //   {
  //     nombre: 'Andrés',
  //     apellido: 'Moises',
  //     dni: '41414141',
  //     rol: 'Administrador',
  //   },
  //   {
  //     nombre: 'Andrés',
  //     apellido: 'Moises',
  //     dni: '41414141',
  //     rol: 'Administrador',
  //   },
  //   {
  //     nombre: 'Andrés',
  //     apellido: 'Moises',
  //     dni: '41414141',
  //     rol: 'Administrador',
  //   },
  //   {
  //     nombre: 'Andrés',
  //     apellido: 'Moises',
  //     dni: '41414141',
  //     rol: 'Laboratorio',
  //   },
  //   {
  //     nombre: 'Andrés',
  //     apellido: 'Moises',
  //     dni: '41414141',
  //     rol: 'Laboratorio',
  //   },
  //   {
  //     nombre: 'Andrés',
  //     apellido: 'Moises',
  //     dni: '41414141',
  //     rol: 'Sucursal',
  //   },
  // ];

  searchValue: string = '';
}
