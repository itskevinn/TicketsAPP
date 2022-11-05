import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {ContentLayoutComponent} from './content-layout/content-layout.component';
import {AuthLayoutComponent} from "./auth-layout/auth-layout.component";


@NgModule({
  declarations: [ContentLayoutComponent,
    AuthLayoutComponent],
  imports: [
    SharedModule
  ]
})
export class LayoutModule {
}
