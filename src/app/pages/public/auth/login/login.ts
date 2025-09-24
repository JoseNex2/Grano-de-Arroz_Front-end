import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth/authService';
import { jwtDecode } from 'jwt-decode';
import { ApiResponse } from '../../../../core/interfaces/api-response';
import { Password } from "primeng/password";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface DecodedToken {
  exp: number;
  iat: number;
  email?: string;
  role?: string;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, Password, ToastModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [MessageService]   // 👈 necesario si no lo pusiste en app.module
})
export class Login {
  loginForm!: FormGroup;
  errorMsg = '';
  submitted = false;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private messageService: MessageService   // 👈 tipo correcto
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.errorMsg = 'Complete todos los campos correctamente';
      this.messageService.add({
        severity: 'warn',
        summary: 'Atención',
        detail: this.errorMsg,
        life: 3000
      });
      return;
    }

    this.errorMsg = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.code == 200) {
          // ... tu lógica de login
          this.router.navigate(['/inicio']);
        } else {
          this.errorMsg = res.message || 'Ingrese los datos correctamente';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.errorMsg,
            life: 3000
          });
          this.loginForm.reset();
          this.submitted = false;
        }
      },
      error: (error) => {
        this.errorMsg = 'Error de red o servidor.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.errorMsg,
          life: 3000
        });

        this.loginForm.reset();
        this.submitted = false;
      }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
