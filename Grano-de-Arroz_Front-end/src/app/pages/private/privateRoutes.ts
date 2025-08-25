import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Home } from './main/home/home';
import { CustomerComponent } from './main/customer/customer.component';
import { CustomerRegistrationComponent } from './main/customer-registration/customer-registration.component';
import { UserComponent } from './main/user/user.component';
import { UserRegistrationComponent } from './main/user-registration/user-registration.component';

export const privateRoutes: Routes = [
  {
    path: 'main',
    component: Main,
    children: [
      { path: '', component: Home },
      { path: 'clientes', component: CustomerComponent },
      {
        path: 'registro-de-clientes',
        component: CustomerRegistrationComponent,
      },
      { path: 'usuario', component: UserComponent },
      { path: 'registro-de-usuario', component: UserRegistrationComponent },
    ],
  },
];
