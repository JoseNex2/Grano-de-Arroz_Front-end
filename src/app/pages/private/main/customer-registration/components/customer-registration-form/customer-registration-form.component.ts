import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, ActivatedRoute } from '@angular/router';
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
  isEditMode = false;
  clientId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  checkEditMode() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['edit'] === 'true') {
        this.isEditMode = true;
        this.clientId = parseInt(params['id']);
        this.loadClientData(params);
      }
    });
  }

  loadClientData(params: any) {
    const clientData = {
      Email: params['email'] || '',
      Name: params['name'] || '',
      Lastname: params['lastname'] || '',
      NationalId: params['nationalId'] || '',
      PhoneNumber: params['phoneNumber'] || ''
    };
    
    this.customerForm.patchValue(clientData);
    
    if (this.isEditMode) {
      this.customerForm.get('Name')?.disable();
      this.customerForm.get('Lastname')?.disable();
      this.customerForm.get('NationalId')?.disable();
    }
  }

  initializeForm() {
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
    
    if (this.isEditMode && this.clientId) {
      const updateData = {
        Id: this.clientId,
        Email: this.customerForm.get('Email')?.value,
        PhoneNumber: this.customerForm.get('PhoneNumber')?.value
      };
      
      this.clientService.updateClient(this.clientId, updateData).subscribe({
        next: (res: ApiResponse<any>) => {
          if (res.code === 200 || res.code === 201) {
            this.successMsg = res.message || 'Cliente actualizado correctamente.';
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: this.successMsg,
              life: 3000
            });
            this.router.navigate(['/inicio/clientes']);
          } else {
            this.errorMsg = res.message || 'Error al actualizar cliente.';
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: this.errorMsg,
              life: 3000
            });
          }
          this.submitting = false;
        },
        error: (err: any) => {
          this.errorMsg = 'Error de red o servidor.';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.errorMsg,
            life: 3000
          });
          this.submitting = false;
          console.error('Error actualización cliente:', err);
        }
      });
    } else {
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
          if (err.status === 409) {
            this.errorMsg = 'El DNI ya se encuentra registrado';
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
          console.error('Error creación cliente:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.customerForm.reset();
    this.errorMsg = null;
    this.successMsg = null;
    this.router.navigate(['/inicio/clientes']);
  }
}
