import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb';
import { BreadcrumbItem } from '../../../../core/interfaces/breadcrumbitem';
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
  steps: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/inicio' }, 
    { label: 'Gestión de usuario', route: '/inicio/usuarios' }, 
    { label: 'Crear nuevo usuario' } 
  ];
}
