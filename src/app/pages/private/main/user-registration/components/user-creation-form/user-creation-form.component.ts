import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import {ApiResponse} from "../../../../../../core/interfaces/api-response";
import {UserService} from "../../../../../../core/services/users/user-service";
import {Router, ActivatedRoute} from "@angular/router";
import {RoleService} from "../../../../../../core/services/roles/role-service";
import {Select} from "primeng/select";
import {mapRolesForDropdown} from "../../../../../../core/mappers/roleMap";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-user-creation-form',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, ReactiveFormsModule, CascadeSelectModule, Select],
  templateUrl: './user-creation-form.component.html',
  styleUrls: ['./user-creation-form.component.css'],
  providers: []
})
export class UserCreationFormComponent implements OnInit{
  isLoading = true;
  userForm!: FormGroup;
  private errorMsg: string | undefined;
  isEditMode = false;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private route: Router, 
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService, 
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
    this.loadRoles();
  }

  checkEditMode() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['edit'] === 'true') {
        this.isEditMode = true;
        this.userId = parseInt(params['id']);
        this.loadUserData(params);
      }
    });
  }

  loadUserData(params: any) {
    // Cargar los datos del usuario en el formulario
    const userData = {
      Name: params['name'] || '',
      Lastname: params['lastname'] || '',
      Email: params['email'] || '',
      NationalId: params['nationalId'] || '',
      PhoneNumber: params['phoneNumber'] || '',
      RoleId: params['role'] || ''
    };
    
    // Actualizar el formulario con los datos del usuario
    this.userForm.patchValue(userData);
  }

  initializeForm() {
    this.userForm = this.fb.group({
      Name: ['', [Validators.required]],
      Lastname: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      NationalId: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required]],
      RoleId: ['', [Validators.required]],
    });
  }

  selectedRoleId: number | null = null;

  roleOptions: { label: string; value: number }[] = [];

  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (res) => {
        if (res.code === 200) {
            const aux = res.response.map((r: any) => ({
            value: r.name,
            id: r.id
          }));

         this.roleOptions = mapRolesForDropdown(aux)
        }
      },
      error: (err) => console.error('Error cargando roles:', err)
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.errorMsg = 'Complete todos los campos';
      return;
    }

    this.isLoading = true;

    if (this.isEditMode && this.userId) {
      // Modo edición
      this.userService.updateUser(this.userId, this.userForm.value).subscribe({
        next: (res: ApiResponse<any>) => {
          if (res.code === 200 || res.code === 201) {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Usuario actualizado correctamente',
              life: 3000
            });
            this.isLoading = false;
            this.route.navigate(['/inicio/usuarios']);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message || 'No se pudo actualizar el usuario',
              life: 3000
            });
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el usuario. Intente nuevamente',
            life: 3000
          });
        },
      });
    } else {
      // Modo creación
      this.userService.createUser(this.userForm.value).subscribe({
        next: (res: ApiResponse<any>) => {
          if (res.code === 200 || res.code === 201) {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Usuario creado correctamente',
              life: 3000
            });
            this.isLoading = false;
            this.route.navigate(['/inicio/usuarios']);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message || 'No se pudo crear el usuario',
              life: 3000
            });
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el usuario. Intente nuevamente',
            life: 3000
          });
        },
      });
    }
  }

  goBack() {
    this.route.navigate([ '/inicio/usuarios']);
  }
}