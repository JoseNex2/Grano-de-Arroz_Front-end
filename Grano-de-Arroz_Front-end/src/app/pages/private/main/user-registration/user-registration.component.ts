import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb';
import { TitlesSubtitlesComponent } from '../../shared/titles-subtitles/titles-subtitles.component';
import { UserCreationFormComponent } from './components/user-creation-form/user-creation-form.component';


@Component({
  selector: 'app-user-registration',
  imports: [BreadcrumbComponent,TitlesSubtitlesComponent,UserCreationFormComponent],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  standalone: true
})
export class UserRegistrationComponent {
  steps: MenuItem[] = [{ label: 'Inicio' }, { label: 'Gestion de usuario' }, { label: 'Crear nuevo usuario' }];
}
