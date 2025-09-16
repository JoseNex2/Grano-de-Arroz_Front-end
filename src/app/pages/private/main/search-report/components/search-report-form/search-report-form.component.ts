import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-report-form',
  imports: [CommonModule,InputTextModule,ButtonModule,DatePickerModule],
  templateUrl: './search-report-form.component.html',
  styleUrls: ['./search-report-form.component.css'],
  standalone: true
})
export class SearchReportFormComponent {

}
