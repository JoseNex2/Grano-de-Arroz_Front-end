import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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

  usuarios: UserInterface[] = [];

  constructor(private readonly router: Router, private readonly userService: UserService) {}

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        if (res.code == 200){
        this.usuarios = res.response;
        this.usuarios = [...this.usuarios].reverse();
        }
      },
      error: (err) => {}
    })
  }

  goToRegister() {
    this.router.navigate(['/inicio/usuarios/registro-de-usuarios']);
  }

  searchValue: string = '';
}