import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth/authService';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})


export class Login {

  loginForm: FormGroup;
  errorMsg = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      userEmail: ['', Validators.required,Validators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  irAlMain() {
    this.router.navigate(['/main']);
  }

  onSubmit() {

    console.log(this.loginForm)

    if (this.loginForm.invalid) {
      this.errorMsg = 'Complete todos los campos';
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('rol', res.rol);
          const decoded = jwtDecode(res.token);
          console.log('Token decodificado:', decoded);
        } else {
          this.errorMsg = 'Usuario o contraseña incorrectos';
        }
        this.router.navigate(['/main']);
      },
      error: () => {
        this.errorMsg = 'Error al conectar con el servidor';
      }
    });
  }
}
