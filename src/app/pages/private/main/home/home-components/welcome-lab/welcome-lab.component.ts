import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TitlesSubtitlesComponent } from '../../../../shared/titles-subtitles/titles-subtitles.component';
import { EvaluationStatusChartsComponent } from "../evaluation-status-charts/evaluation-status-charts.component";

@Component({
  selector: 'app-welcome-lab',
  imports: [ButtonModule, TitlesSubtitlesComponent],
  templateUrl: './welcome-lab.component.html',
})
export class WelcomeLabComponent {
  @Input() labName = 'ITHURBIDE';
  @Output() start = new EventEmitter<void>();
  onStart() {
    this.start.emit();
  }
}
