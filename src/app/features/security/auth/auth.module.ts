import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../../../shared/shared.module";
import { LogoutComponent } from './logout/logout.component';


@NgModule({
    declarations: [LoginComponent, LogoutComponent],
    exports: [
        LogoutComponent
    ],
    imports: [
        SharedModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
