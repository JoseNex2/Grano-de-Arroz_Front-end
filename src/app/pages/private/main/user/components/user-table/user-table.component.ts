import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UserInterface } from '../../../../../../core/interfaces/userInterface';
import { Router } from '@angular/router';
import { UserService } from '../../../../../../core/services/users/user-service';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, MenuModule,DialogModule],
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
    this.router.navigate(['/main/registro-de-usuario']);
  }

  searchValue: string = '';


  getRowMenuItems(c: any): MenuItem[] {
    return [
      { label: 'Editar', icon: 'pi pi-pencil', command: () => this.onEdit(c) },
      { label: 'Eliminar', icon: 'pi pi-trash', command: () => this.onDelete(c) },
    ];
  }

  onEdit(c:any) {console.log('Editar usuario:', c);
  }

  onDelete(c:any) {console.log('Eliminar usuario:', c);
  }


  onMenuButtonClick(event: MouseEvent, menu: Menu) {
    event.preventDefault();
    event.stopPropagation();
    menu.toggle(event);
  }
}