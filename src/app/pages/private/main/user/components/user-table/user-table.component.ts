import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UserInterface } from '../../../../../../core/interfaces/userInterface';
import { Router } from '@angular/router';
import { UserService } from '../../../../../../core/services/users/user-service';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import {ConfirmDialog} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from 'primeng/api';
import { ViewChild } from '@angular/core';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, MenuModule, DialogModule, ConfirmDialog],
  providers: [ConfirmationService],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  standalone: true,
})
export class UserTableComponent implements OnInit {

  @ViewChild('contextMenu') contextMenu!: Menu;
  
  usuarios: UserInterface[] = [];
  selectedUser: any = null;
  menuItems: MenuItem[] = [];

  constructor(private readonly router: Router,
              private readonly userService: UserService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
  ) {}

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


  showMenu(event: MouseEvent, user: any) {
    this.selectedUser = user;
    this.menuItems = [
      // { label: 'Editar', icon: 'pi pi-pencil', command: () => this.onEdit(this.selectedUser) },
      { label: 'Eliminar', icon: 'pi pi-trash', command: () => this.onDelete(this.selectedUser) },
    ];
    this.contextMenu.toggle(event);
  }

  onEdit(user: any) {
    this.router.navigate(['/inicio/usuarios/registro-de-usuarios'], {
      queryParams: {
        edit: 'true',
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        nationalId: user.nationalId,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    });
  }

  onDelete(c: any) {
    this.confirmationService.confirm({
      message: `¿Seguro que deseas eliminar al usuario ${c.name}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(c.id).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Usuario eliminado correctamente',
              life: 3000
            });
            this.loadTable();
          },
          error: (err) => {
            console.error("Error eliminando usuario:", err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el usuario. Intente nuevamente',
              life: 3000
            });
          }
        });
      }
    });
  }

}