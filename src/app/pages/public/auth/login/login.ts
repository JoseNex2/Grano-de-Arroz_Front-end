import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [ReactiveFormsModule],
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
      this.errorMsg = 'Complete todos los campos';
      return;
    }

    this.errorMsg = ''; // Limpiar mensaje de error anterior

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.code == 200) {
          // Guardar datos en localStorage
          localStorage.setItem('access_token', res.response.token);
          localStorage.setItem('rol', res.response.role);
          localStorage.setItem('email', res.response.email);

          // Decodificar token para obtener información adicional
          try {
            const decodedToken: DecodedToken = jwtDecode(res.response.token);
            // Guardar información adicional del token si es necesario
            if (decodedToken.exp) {
              localStorage.setItem('token_exp', decodedToken.exp.toString());
            }
          } catch (error) {
            console.error('Error decodificando token:', error);
          }

          this.router.navigate(['/main']);
        } else {
          this.errorMsg = res.message || 'Usuario o contraseña incorrectos';
        }
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.errorMsg = error.error?.message || 'Error al conectar con el servidor';
      }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
