import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../core/services/email/email.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  submitting = false;
  errorMsg: string | null = null;
  successMsg: string | null = null;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.errorMsg = 'Por favor ingrese un email válido';
      this.messageService.add({
        severity: 'warn',
        summary: 'Atención',
        detail: this.errorMsg,
        life: 3000
      });
      return;
    }

    this.errorMsg = null;
    this.successMsg = null;
    this.submitting = true;
    const email = this.forgotPasswordForm.get('email')?.value;
    const baseUrl = window.location.origin;

    this.emailService.requestPasswordReset(email, baseUrl).subscribe({
      next: (res) => {
        if (res.code === 200 || res.code === 201) {
          this.successMsg = res.message || 'Si el mail existe se enviará un correo con las instrucciones para recuperar tu contraseña';
          
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: this.successMsg,
            life: 3000
          });
          
          this.forgotPasswordForm.reset();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 4000);
        } else {
          this.errorMsg = res.message || 'No se pudo procesar la solicitud';
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
        if (err.status === 404) {
          this.errorMsg = 'El email no está registrado en el sistema';
        } else if (err.error && err.error.message) {
          this.errorMsg = err.error.message;
        } else if (err.status >= 500) {
          this.errorMsg = 'Error del servidor. Intente nuevamente';
        } else {
          this.errorMsg = 'Error de red o servidor.';
        }
        
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.errorMsg || 'Error desconocido',
          life: 3000
        });
        this.submitting = false;
        console.error('Error recuperación contraseña:', err);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
