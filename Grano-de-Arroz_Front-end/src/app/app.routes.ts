import { Routes } from '@angular/router';
import { publicRoutes } from './pages/public/publicRoutes';
import { privateRoutes } from './pages/private/privateRoutes';

export const routes: Routes = [

  ...publicRoutes,

 ...privateRoutes,

  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: '**', redirectTo: 'login' }

];
