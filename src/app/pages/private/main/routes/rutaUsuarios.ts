import {Routes} from "@angular/router";
import {CustomerComponent} from "../customer/customer.component";
import {CustomerRegistrationComponent} from "../customer-registration/customer-registration.component";
import {UserRegistrationComponent} from "../user-registration/user-registration.component";
import {UserComponent} from "../user/user.component";


export const rutaUsuarios: Routes = [
    {
        path: 'usuarios',
        children: [
            { path: '', component: UserComponent },
            { path: 'registro-de-usuarios', component: UserRegistrationComponent },
        ],
    },
];