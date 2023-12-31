import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../../../shared/shared.module";
import {LogoutComponent} from './logout/logout.component';
import {RegisterUserComponent} from "./register-user/register-user.component";


@NgModule({
    declarations: [LoginComponent, LogoutComponent, RegisterUserComponent],
    exports: [
        LogoutComponent
    ],
    imports: [
        SharedModule,
        AuthRoutingModule
    ]
})
export class AuthModule {
}
