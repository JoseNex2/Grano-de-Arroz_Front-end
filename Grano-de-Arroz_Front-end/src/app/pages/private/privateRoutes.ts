import { Routes } from '@angular/router';
import { Main } from './main/main';
import {Home} from './main/home/home';

export const privateRoutes: Routes = [
  {
    path: 'main',
    component: Main,
    children: [
      { path: '', component: Home }
    ]
  }
];
