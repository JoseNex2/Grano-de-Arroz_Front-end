import {Routes} from "@angular/router";
import {CustomerComponent} from "../customer/customer.component";
import {CustomerRegistrationComponent} from "../customer-registration/customer-registration.component";
import {CustomerProfileComponent} from "../customer-profile/customer-profile.component";


export const rutaClientes: Routes = [
    {
        path: 'clientes',
        children: [
            { path: '', component: CustomerComponent },
            { path: 'registro-de-clientes', component: CustomerRegistrationComponent },
            { path: 'perfil-de-clientes', component: CustomerProfileComponent}
        ],
    },
];