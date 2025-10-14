import {Routes} from "@angular/router";
import {CustomerComponent} from "../customer/customer.component";
import {CustomerRegistrationComponent} from "../customer-registration/customer-registration.component";


export const rutaClientes: Routes = [
    {
        path: 'clientes',
        children: [
            { path: '', component: CustomerComponent },
            { path: 'registro-de-clientes', component: CustomerRegistrationComponent },
        ],
    },
];