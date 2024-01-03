import { NgModule } from '@angular/core';

import { RegisterRoutingModule } from './register-routing.module';
import {SharedModule} from "../../../shared/shared.module";
import { RegisterUserComponent } from './register-user/register-user.component';

@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    RegisterRoutingModule,
    SharedModule
  ]
})
export class RegisterModule { }
