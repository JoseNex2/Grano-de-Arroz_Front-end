import { Routes } from '@angular/router';
import {Login} from './auth/login/login';
import {Auth} from './auth/auth';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';

export const publicRoutes: Routes = [
  {
    path: '',
    component: Auth,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login},
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  }
];
