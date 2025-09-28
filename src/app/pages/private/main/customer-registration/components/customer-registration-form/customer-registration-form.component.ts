import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ClientService } from '../../../../../../core/services/clients/client-service';
import { ApiResponse } from '../../../../../../core/interfaces/api-response';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './customer-registration-form.component.html',
  styleUrls: ['./customer-registration-form.component.css']
})
export class CustomerRegistrationFormComponent implements OnInit {

  customerForm!: FormGroup;

  submitting = false;
  errorMsg: string | null = null;
  successMsg: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Name: ['', [Validators.required, Validators.maxLength(30)]],
      Lastname: ['', [Validators.required, Validators.maxLength(30)]],
      NationalId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.errorMsg = 'Completa los campos requeridos.';
      return;
    }

    this.errorMsg = null;
    this.successMsg = null;
    this.submitting = true;
    
    this.clientService.createClient(this.customerForm.value).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.code === 200 || res.code === 201) {
          this.successMsg = res.message || 'Cliente creado correctamente.';
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: this.successMsg,
            life: 3000
          });
          this.customerForm.reset();
          this.router.navigate(['/inicio/clientes']);
        } else {
          this.errorMsg = res.message || 'Error al crear cliente.';
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
        this.errorMsg = 'Error de red o servidor.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.errorMsg,
          life: 3000
        });
        this.submitting = false;
        console.error('Error creación cliente:', err);
      }
    });
  }

  onCancel(): void {
    this.customerForm.reset();
    this.errorMsg = null;
    this.successMsg = null;
    this.router.navigate(['/inicio/clientes']);
  }
}
