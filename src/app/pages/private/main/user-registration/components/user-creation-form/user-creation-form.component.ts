import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import {ApiResponse} from "../../../../../../core/interfaces/api-response";
import {UserService} from "../../../../../../core/services/users/user-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-creation-form',
  standalone: true,
  imports: [CommonModule,ButtonModule,InputTextModule,ReactiveFormsModule,CascadeSelectModule],
  templateUrl: './user-creation-form.component.html',
  styleUrls: ['./user-creation-form.component.css']
})
export class UserCreationFormComponent implements OnInit{

  userForm!: FormGroup;
  private errorMsg: string | undefined;

  constructor(private fb: FormBuilder, private userService: UserService, private route: Router) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      Name: ['', [Validators.required]],
      Lastname: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      NationalId: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required]],
      Role: ['', [Validators.required]],
    });

  }

  roleOptions: any[] = [
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Laboratorio', value: 'LAB' },
    { label: 'Sucursal', value: 'SUC' }
  ];



  onSubmit() {
    if (this.userForm.invalid) {
      this.errorMsg = 'Complete todos los campos';
      return;
    }

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
