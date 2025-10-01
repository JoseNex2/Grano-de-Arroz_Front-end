import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TitlesSubtitlesComponent } from '../../shared/titles-subtitles/titles-subtitles.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../../../core/interfaces/api-response';
import { BatteryService } from '../../../../core/services/battery/battery-service';
import { BatteryInterface } from '../../../../core/interfaces/batteryinterface';

@Component({
  selector: 'app-battery-assign-modal',
  imports: [CommonModule,InputTextModule,DatePicker,ButtonModule,TitlesSubtitlesComponent,ReactiveFormsModule],
  templateUrl: './battery-assign-modal.component.html',
  styleUrls: ['./battery-assign-modal.component.css'],
  standalone: true
})
export class BatteryAssignModalComponent {
  @Input() client: { id?: number; name?: string; lastName?: string; } | null = null;
  @Output() closed = new EventEmitter<boolean>();
  @Output() submitted = new EventEmitter<BatteryInterface>();

  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private batteryService: BatteryService, private messageService: MessageService) {
    this.form = this.fb.group({
      ChipId: ['', [Validators.required, Validators.maxLength(100)]],
      Ot: ['', [Validators.required, Validators.maxLength(100)]],
      SaleDate: [null, Validators.required], 
    });
  }

  get clientFullName(): string {
    if (!this.client) return '';
    return `${this.client.name ?? ''} ${this.client.lastName ?? ''}`.trim();
  }

  onCancel() {
    this.closed.emit(false);
  }

  onSubmit() {
    if (this.form.invalid || !this.client?.id) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.value;
    const payload: BatteryInterface = {
      ChipId: raw.ChipId,
      Ot: raw.Ot || '',
      SaleDate: this.normalizeDate(raw.SaleDate),
      ClientId: String(this.client.id)
    };
    this.loading = true;
    this.batteryService.postBattery(payload).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.code === 200 || res.code === 201) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Se ha registrado la batería correctamente',
            life: 3000
          });
          this.submitted.emit(payload);
          this.closed.emit(true);
          this.form.reset();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message || 'No se pudo asociar' });
        }
        this.loading = false;
      },
      error: err => {
        console.error('Error registrando batería', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error de red' });
        this.loading = false;
      }
    });
  }

  private normalizeDate(d: any): string {
    if (!d) return '';
    if (d instanceof Date) return d.toISOString();
    try { return new Date(d).toISOString().split('T')[0]; } catch { return ''; }
  }
}
