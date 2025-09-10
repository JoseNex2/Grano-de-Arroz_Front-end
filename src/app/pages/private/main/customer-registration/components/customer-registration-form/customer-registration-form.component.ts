import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ClientService } from '../../../../../../core/services/clients/client-service';
import { ApiResponse } from '../../../../../../core/interfaces/api-response';
// import { ClientInterface } from '../../../../../core/interfaces/clientinterface'; 

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      // GdaNumber: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Name: ['', Validators.required],
      Lastname: ['', Validators.required],
      NationalId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      // SaleDate: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }


  onSubmit(): void {
    if (this.customerForm.invalid) {
      // this.customerForm.markAllAsTouched();
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
          this.customerForm.reset();
          this.router.navigate(['/main/clientes']);
        } else {
          this.errorMsg = res.message || 'Error al crear cliente.';
        }
        this.submitting = false;
      },
      error: (err) => {
        this.errorMsg = 'Error de red o servidor.';
        this.submitting = false;
        console.error('Error creación cliente:', err);
      }
    });
  }

  onCancel(): void {
    this.customerForm.reset();
    this.errorMsg = null;
    this.successMsg = null;
    this.router.navigate(['/main/clientes']); 
  }
}
