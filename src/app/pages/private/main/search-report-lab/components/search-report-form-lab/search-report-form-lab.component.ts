import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../../../../core/interfaces/api-response';
import {Component, OnInit} from "@angular/core";
import {ButtonModule} from "primeng/button";
import {CommonModule} from "@angular/common";
import {ReportService} from "../../../../../../core/services/reports/reportService";

@Component({
  selector: 'app-search-report-form-lab',
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  templateUrl: './search-report-form-lab.component.html',
  styleUrl: './search-report-form-lab.component.css',
  standalone: true,
})
export class SearchReportFormLabComponent implements OnInit {

  reportForm!: FormGroup;

  constructor(
      private reportsService: ReportService,
      private fb: FormBuilder,
      private route: Router,
      private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.reportsService.reportsByData.set(null);
  }

  getReportsByFilter(): void {
    const payload = this.convertEmptyToNull(this.reportForm.value);

    this.reportsService.getReportByData(payload).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.code === 200 || res.code === 201) {
          this.reportsService.reportsByData.set(res.response);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Reporte encontrado correctamente',
            life: 3000,
          });
        } else {
          this.reportsService.reportsByData.set(null);
        }
      },
      error: () => {
        this.reportsService.reportsByData.set(null);
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
    this.reportForm = this.fb.group({
      ChipId: [''],
      ClientName: [''],
      State: [''],
      ReportDate: [''],
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
    this.reportForm.reset();
    this.reportsService.reportsByData.set(null);
  }
}
