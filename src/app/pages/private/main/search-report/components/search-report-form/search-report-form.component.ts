import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BatteryService } from '../../../../../../core/services/battery/battery-service';
import { ApiResponse } from '../../../../../../core/interfaces/api-response';

@Component({
  selector: 'app-search-report-form',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-report-form.component.html',
  styleUrls: ['./search-report-form.component.css'],
  providers: [MessageService],
})
export class SearchReportFormComponent implements OnInit {
  batteryForm!: FormGroup;

  constructor(
      private batteryService: BatteryService,
      private fb: FormBuilder,
      private route: Router,
      private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.batteryService.batteriesByClientData.set(null);
  }

  getBatterybyFilter(): void {
    const payload = this.convertEmptyToNull(this.batteryForm.value);

    this.batteryService.getRatteriesByClientData(payload).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.code === 200 || res.code === 201) {
          this.batteryService.batteriesByClientData.set(res.response);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Reporte encontrado correctamente',
            life: 3000,
          });
        } else {
          this.batteryService.batteriesByClientData.set(null);
        }
      },
      error: () => {
        this.batteryService.batteriesByClientData.set(null);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo acceder al reporte',
          life: 3000,
        });
      },
    });
  }

  initializeForm(): void {
    this.batteryForm = this.fb.group({
      ChipId: [''],
      SaleDate: [''],
      ClientName: [''],
    });
  }

  convertEmptyToNull(obj: any): any {
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value === '') newObj[key] = null;
      else if (typeof value === 'object' && value !== null)
        newObj[key] = this.convertEmptyToNull(value);
      else newObj[key] = value;
    });
    return newObj;
  }


  resetForm(): void {
    this.batteryForm.reset();
    this.batteryService.batteriesByClientData.set(null);
  }
}
