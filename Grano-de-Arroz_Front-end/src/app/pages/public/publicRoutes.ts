import { Routes } from '@angular/router';
import {Login} from './auth/login/login';
import {Auth} from './auth/auth';

export const publicRoutes: Routes = [
  {
    path: '',
    component: Auth,
    children: [
      { path: 'login', component: Login},
      //{ path: 'recuperar-contraseña', component:  }
    ]
  }
];
