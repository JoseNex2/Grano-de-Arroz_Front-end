import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbComponent, BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb';
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
    { label: 'Crear nuevo usuario' } // Sin route = página actual, no clickeable
  ];
}
