import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {ContentLayoutComponent} from './content-layout/content-layout.component';
import {AuthLayoutComponent} from "./auth-layout/auth-layout.component";
import { NavbarComponent } from './navbar/navbar.component';
import {AuthModule} from "../features/security/auth/auth.module";


@NgModule({
    declarations: [ContentLayoutComponent,
        AuthLayoutComponent,
        NavbarComponent],
    exports: [
        NavbarComponent
    ],
  imports: [
    SharedModule,
    AuthModule
  ]
})
export class LayoutModule {
}
