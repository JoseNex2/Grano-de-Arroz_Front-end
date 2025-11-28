import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Home } from './main/home/home';
import { CustomerRegistrationComponent } from './main/customer-registration/customer-registration.component';
import { UserComponent } from './main/user/user.component';
import { UserRegistrationComponent } from './main/user-registration/user-registration.component';
import { BatteryAssignModalComponent } from './main/battery-assign-modal/battery-assign-modal.component';

import { SearchReportComponent } from './main/search-report/search-report.component';

import {rutaClientes} from "./main/routes/rutaClientes";
import {rutaUsuarios} from "./main/routes/rutaUsuarios";
import {rutaReportes} from "./main/routes/rutaReportes";
import {StepperLabComponent} from "./main/stepper-lab/stepper-lab.component";
import {ReportHistoryComponent} from "./main/report-history/report-history.component";
import {GeneralStatsComponent} from "./main/general-stats/general-stats.component";



export const privateRoutes: Routes = [
  {
    path: 'inicio',
    component: Main,
    children: [
      { path: '', component: Home },
      { path: '', children: rutaClientes },
      { path: '', children: rutaUsuarios },
      { path: '', children: rutaReportes },
      { path: 'prueba-bateria',   component: BatteryAssignModalComponent},
      { path: 'search-report',   component: SearchReportComponent },
      { path: 'analizar-bateria', component: StepperLabComponent},
      { path: 'registros-historicos', component: ReportHistoryComponent},
      {path: 'metricas-generales', component: GeneralStatsComponent}
    ],
  },
];
