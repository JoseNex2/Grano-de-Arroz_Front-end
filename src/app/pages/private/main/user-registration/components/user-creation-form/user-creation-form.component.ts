import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
  selector: 'app-user-creation-form',
  standalone: true,
  imports: [CommonModule,ButtonModule,InputTextModule,ReactiveFormsModule,CascadeSelectModule],
  templateUrl: './user-creation-form.component.html',
  styleUrls: ['./user-creation-form.component.css']
})
export class UserCreationFormComponent {
  roleOptions: any[] = [
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Laboratorio', value: 'LAB' },
    { label: 'Sucursal', value: 'SUC' }
  ];
}
