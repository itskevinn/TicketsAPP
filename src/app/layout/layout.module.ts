import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {ContentLayoutComponent} from './content-layout/content-layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {AuthModule} from "../features/security/auth/auth.module";
import {PanelMenuModule} from 'primeng/panelmenu';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {TopBarComponent} from "./topbar/topbar.component";
import {LayoutService} from "./service/layout.service";
import {MenuComponent} from './menu/menu.component';
import {MenuitemComponent} from "./menu/app.menuitem.component";
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from "@angular/router";
import {HomeModule} from "../features/home/home.module";
import {UserModule} from "../features/security/user/user.module";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";

@NgModule({
  declarations: [ContentLayoutComponent,
    TopBarComponent,
    MenuComponent,
    MenuitemComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbComponent
  ],
  exports: [
    ContentLayoutComponent
  ],
  imports: [
    SharedModule,
    AuthModule,
    RouterModule,
    PanelMenuModule,
    BreadcrumbModule,
    HomeModule,
    UserModule
  ],
  providers: [LayoutService]
})
export class LayoutModule {
}
