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
      private messageService: MessageService
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
          localStorage.setItem('meUser', JSON.stringify(res.response));
          localStorage.setItem('access_token', res.response.token);
          localStorage.setItem('rol', JSON.stringify(res.response.role));
          localStorage.setItem('email', res.response.email);

          try {
            const decodedToken: DecodedToken = jwtDecode(res.response.token);
            if (decodedToken.exp) {
              localStorage.setItem('token_exp', decodedToken.exp.toString());
            }
          } catch (error) {
            console.error('Error decodificando token:', error);
          }

          this.messageService.add({
            severity: 'success',
            summary: 'Bienvenido',
            detail: 'Inicio de sesión exitoso',
            life: 2000
          });

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
        console.error('Error completo:', error);

        if (error.error && error.error.message) {
          this.errorMsg = error.error.message;
        }
        else if (error.status === 401 || error.status === 400) {
          this.errorMsg = 'Ingrese los datos correctamente';
        } else if (error.status === 404) {
          this.errorMsg = 'Usuario no encontrado';
        } else if (error.status >= 500) {
          this.errorMsg = 'Error del servidor. Intente nuevamente';
        } else {
          this.errorMsg = 'Error de red o servidor.';
        }

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
