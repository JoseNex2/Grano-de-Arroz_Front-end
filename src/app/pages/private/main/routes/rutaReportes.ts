import {Routes} from "@angular/router";
import {SearchReportComponent} from "../search-report/search-report.component";

export const rutaReportes: Routes = [
    {
        path: 'reportes',
        children: [
            { path: '', component: SearchReportComponent },
        ],
    },
];