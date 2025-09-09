import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import {ApiResponse} from "../../../../../../core/interfaces/api-response";
import {UserService} from "../../../../../../core/services/users/user-service";
import {Router} from "@angular/router";
import {RoleService} from "../../../../../../core/services/roles/role-service";
import {Select} from "primeng/select";

@Component({
  selector: 'app-user-creation-form',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, ReactiveFormsModule, CascadeSelectModule, Select],
  templateUrl: './user-creation-form.component.html',
  styleUrls: ['./user-creation-form.component.css']
})
export class UserCreationFormComponent implements OnInit{

  userForm!: FormGroup;
  roleOptions: any[] = [];
  private errorMsg: string | undefined;

  constructor(private fb: FormBuilder, private userService: UserService, private route: Router, private roleService: RoleService) {
  }

  ngOnInit(): void {

    this.loadRoles();
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

  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (res) => {
        if (res.code === 200) {
          // Simplificar la estructura para p-dropdown
          this.roleOptions = res.response.map((r: any) => ({
            label: r.name,
            value: r.id
          }));
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

    console.log(this.userForm.value);

    this.userService.createUser(this.userForm.value).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.code == 200) {
          console.log(res.response);
        }
      }
    })
  }

  goBack() {
    this.route.navigate([ '/main/usuarios']);
  }
}