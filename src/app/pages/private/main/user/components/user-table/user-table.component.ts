import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UserInterface } from '../../../../../../core/interfaces/userInterface';
import { Router } from '@angular/router';
import { UserService } from '../../../../../../core/services/users/user-service';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  standalone: true,
})
export class UserTableComponent implements OnInit {

  // Agrega esta declaración de variable
  usuarios: any[] = [];

  constructor(private readonly router: Router, private readonly userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        console.log('Respuesta del servidor:', res);
        this.usuarios = res.response;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  searchValue: string = '';
}
