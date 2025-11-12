import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from "@angular/forms";
import { FloatLabel } from "primeng/floatlabel";
import { Button } from "primeng/button";
import { Textarea } from "primeng/textarea";
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-stepper-actions',
  imports: [
    FormsModule,
    RadioButton,
    FloatLabel,
    Button,
    Textarea
  ],
  templateUrl: './stepper-actions.component.html',
  styleUrl: './stepper-actions.component.css',
  standalone: true,
})
export class StepperActionsComponent implements OnChanges {
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 6;
  @Input() activateCallback?: (value: number) => void;
  @Input() group?: AbstractControl | null;
  @Input() isLast: boolean = false;

  @Output() submitForm = new EventEmitter<void>();

  estado: string = 'aprobado';
  comentario: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['group'] && this.group) {
      const g = this.group;
      const incoming = (g.get('estado')?.value || '').toString().toLowerCase();
      if (incoming === 'aprobado' || incoming === 'desaprobado') {
        this.estado = incoming;
      } else {
        // default to aprobado and sync back to the group
        this.estado = 'aprobado';
        g.patchValue({ estado: 'aprobado' }, { emitEvent: true });
      }
      this.comentario = g.get('comentario')?.value || '';
    }
  }

  private syncToGroup(): void {
    if (!this.group) return;
    this.group.patchValue({ estado: this.estado, comentario: this.comentario }, { emitEvent: true });
  }

  onPrimary(): void {
    this.syncToGroup();
    if (this.isLast) {
      this.submitForm.emit();
      return;
    }
    this.onNext();
  }

  onNext(): void {
    if (!this.activateCallback) return;
    const next = Math.min(this.totalSteps, (this.currentStep || 1) + 1);
    if (next !== this.currentStep) this.activateCallback(next);
  }

  onBack(): void {
    if (!this.activateCallback) return;
    const prev = Math.max(1, (this.currentStep || 1) - 1);
    if (prev !== this.currentStep) this.activateCallback(prev);
  }
}
