import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Agregar para *ngIf
import { AuthService } from '../../../../core/services/auth/authService';
import { jwtDecode } from 'jwt-decode';
import {ApiResponse} from '../../../../core/interfaces/api-response';

// Interface para el token decodificado
interface DecodedToken {
  exp: number;
  iat: number;
  email?: string;
  role?: string;
  // Agrega otras propiedades que tenga tu token
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule], // Agregar CommonModule
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm!: FormGroup;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Complete todos los campos correctamente';
      return;
    }

    this.errorMsg = ''; // Limpiar mensaje de error anterior

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.code == 200) {
          // Login exitoso
          localStorage.setItem('access_token', res.response.token);
          localStorage.setItem('rol', res.response.role);
          localStorage.setItem('email', res.response.email);

          try {
            const decodedToken: DecodedToken = jwtDecode(res.response.token);
            console.log('Token decodificado:', decodedToken);

            if (decodedToken.exp) {
              localStorage.setItem('token_exp', decodedToken.exp.toString());
            }
          } catch (error) {
            console.error('Error decodificando token:', error);
          }

          this.router.navigate(['/main']);
        } else {
          // Credenciales incorrectas (código != 200)
          this.errorMsg = res.message || 'Ingrese los datos correctamente';
          this.loginForm.reset(); 
        }
      },
      error: (error) => {
        console.error('Error completo:', error);
        
        // Si el error tiene una respuesta estructurada con ApiResponse
        if (error.error && error.error.message) {
          this.errorMsg = error.error.message;
        } 
        // Manejo por códigos de estado HTTP
        else if (error.status === 401 || error.status === 400) {
          this.errorMsg = 'Ingrese los datos correctamente';
        } else if (error.status === 404) {
          this.errorMsg = 'Usuario no encontrado';
        } else if (error.status >= 500) {
          this.errorMsg = 'Error del servidor. Intente nuevamente';
        } else {
          this.errorMsg = 'Ingrese los datos correctamente';
        }
        
        this.loginForm.reset();
      }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
