import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {ContentLayoutComponent} from './content-layout/content-layout.component';
import {AuthLayoutComponent} from "./auth-layout/auth-layout.component";
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import {AuthModule} from "../features/security/auth/auth.module";
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
    declarations: [ContentLayoutComponent,
        AuthLayoutComponent,
        NavbarComponent,
        SidebarComponent,
        RegisterUserComponent
      ],
    exports: [
        NavbarComponent,
        SidebarComponent,
        RegisterUserComponent,
        PanelMenuModule
    ],
  imports: [
    SharedModule,
    AuthModule,
    PanelMenuModule
  ]
})
export class LayoutModule {
}
