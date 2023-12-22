import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {ContentLayoutComponent} from './content-layout/content-layout.component';
import {AuthLayoutComponent} from "./auth-layout/auth-layout.component";
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {AuthModule} from "../features/security/auth/auth.module";
import {PanelMenuModule} from 'primeng/panelmenu';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {TopBarComponent} from "./topbar/topbar.component";
import {LayoutService} from "./service/layout.service";
import {MenuComponent} from './menu/menu.component';
import {MenuitemComponent} from "./menu/app.menuitem.component";
import {FooterComponent} from './footer/footer.component';
import {ConfigComponent} from "./config/config.component";
import {SidebarModule} from "primeng/sidebar";

@NgModule({
    declarations: [ContentLayoutComponent,
        AuthLayoutComponent,
        NavbarComponent,
        RegisterUserComponent,
        TopBarComponent,
        MenuComponent,
        MenuitemComponent,
        SidebarComponent,
        FooterComponent,
        ConfigComponent
    ],
    exports: [
        NavbarComponent,
        RegisterUserComponent,
        PanelMenuModule
    ],
    imports: [
        SharedModule,
        AuthModule,
        PanelMenuModule,
        BreadcrumbModule,
        SidebarModule
    ],
    providers: [LayoutService]
})
export class LayoutModule {
}
