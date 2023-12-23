import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {CreateModifyUserDialogComponent} from "./create-modify-user-dialog/create-modify-user-dialog.component";
import {UsersInfoComponent} from "./users-info/users-info.component";
import {TableModule} from "primeng/table";


@NgModule({
    declarations: [CreateModifyUserDialogComponent, UsersInfoComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        TableModule
    ]
})
export class UserModule {
}
