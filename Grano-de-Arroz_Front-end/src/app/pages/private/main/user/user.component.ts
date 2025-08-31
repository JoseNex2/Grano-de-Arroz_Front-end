import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb';
import { UserTableComponent } from './components/user-table/user-table.component';
import { TitlesSubtitlesComponent } from '../../shared/titles-subtitles/titles-subtitles.component';
import {UserService} from '../../../../core/services/users/user-service';

@Component({
  selector: 'app-user',
  imports: [BreadcrumbComponent, UserTableComponent, TitlesSubtitlesComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true
})
export class UserComponent {

  constructor(private readonly userService:UserService) {
  }



  steps: MenuItem[] = [{ label: 'Inicio' }, { label: 'Gestion de usuario' }];
}
