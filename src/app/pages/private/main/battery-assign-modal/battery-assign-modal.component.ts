import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TitlesSubtitlesComponent } from '../../shared/titles-subtitles/titles-subtitles.component';

@Component({
  selector: 'app-battery-assign-modal',
  imports: [CommonModule,InputTextModule,DatePicker,ButtonModule,TitlesSubtitlesComponent],
  templateUrl: './battery-assign-modal.component.html',
  styleUrls: ['./battery-assign-modal.component.css'],
  standalone: true
})
export class BatteryAssignModalComponent {

}
