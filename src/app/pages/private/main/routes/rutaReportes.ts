import {Routes} from "@angular/router";
import {SearchReportComponent} from "../search-report/search-report.component";
import {SearchReportLabComponent} from "../search-report-lab/search-report-lab.component";

export const rutaReportes: Routes = [
    {
        path: 'reportes',
        children: [
            { path: 'generar', component: SearchReportComponent },
            { path: 'buscar', component: SearchReportLabComponent },
        ],
    },
];