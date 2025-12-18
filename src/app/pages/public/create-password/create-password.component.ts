import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Button } from 'primeng/button';
import { Password } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { EmailService } from '../../../core/services/email/email.service';

@Component({
  selector: 'app-create-password',
  imports: [CommonModule, Password, ReactiveFormsModule],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.css'
})
export class CreatePasswordComponent implements OnInit {
  createPasswordForm!: FormGroup;
  submitting = false;
  errorMsg: string | null = null;
  successMsg: string | null = null;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      
      // Reemplazar espacios por + (problema de decodificación de URL)
      if (this.token) {
        this.token = this.token.replace(/ /g, '+');
      }
      
      if (!this.token) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Token inválido',
          life: 3000
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      }
    });

    this.createPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), CreatePasswordComponent.passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: CreatePasswordComponent.passwordMatchValidator });
  }

  private static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    const hasMinLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasSpecialChar && hasMinLength;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  private static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.createPasswordForm.invalid) {
      if (this.createPasswordForm.errors?.['passwordMismatch']) {
        this.errorMsg = 'Las contraseñas no coinciden';
      } else if (this.createPasswordForm.get('password')?.errors?.['passwordStrength']) {
        this.errorMsg = 'La contraseña debe contener al menos una mayúscula, un carácter especial y 8 caracteres';
      } else {
        this.errorMsg = 'Por favor complete todos los campos correctamente';
      }
      this.messageService.add({
        severity: 'warn',
        summary: 'Atención',
        detail: this.errorMsg,
        life: 3000
      });
      return;
    }

    if (!this.token) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Token inválido',
        life: 3000
      });
      return;
    }

    this.errorMsg = null;
    this.successMsg = null;
    this.submitting = true;

    const newPassword = this.createPasswordForm.get('password')?.value;

    this.emailService.createPassword(this.token, newPassword).subscribe({
      next: (res) => {
        if (res.code === 200 || res.code === 201) {
          this.successMsg = res.message || 'Contraseña actualizada correctamente';
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: this.successMsg,
            life: 3000
          });
          this.createPasswordForm.reset();

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.errorMsg = res.message || 'No se pudo actualizar la contraseña';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.errorMsg,
            life: 3000
          });
        }
        this.submitting = false;
      },
      error: (err) => {
        if (err.status === 401 || err.status === 403) {
          this.errorMsg = 'Contraseña actual incorrecta';
        } else if (err.status === 404) {
          this.errorMsg = 'Usuario no encontrado';
        } else if (err.error && err.error.message) {
          this.errorMsg = err.error.message;
        } else if (err.status >= 500) {
          this.errorMsg = 'Error del servidor. Intente nuevamente';
        } else {
          this.errorMsg = 'Error al actualizar la contraseña';
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.errorMsg || 'Error desconocido',
          life: 3000
        });
        this.submitting = false;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
