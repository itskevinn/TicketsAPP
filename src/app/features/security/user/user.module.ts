import {NgModule} from '@angular/core';

import {UserRoutingModule} from './user-routing.module';
import {CreateModifyUserDialogComponent} from "./create-modify-user-dialog/create-modify-user-dialog.component";
import {UsersInfoComponent} from "./users-info/users-info.component";
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
    declarations: [CreateModifyUserDialogComponent, UsersInfoComponent],
    imports: [
        SharedModule,
        UserRoutingModule
    ]
})
export class UserModule {
}
