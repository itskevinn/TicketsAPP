import {NgModule} from '@angular/core';

import {UserRoutingModule} from './user-routing.module';
import {CreateModifyUserDialogComponent} from "./create-modify-user-dialog/create-modify-user-dialog.component";
import {UsersInfoComponent} from "./users-info/users-info.component";
import {SharedModule} from "../../../shared/shared.module";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import { DialogModule } from 'primeng/dialog';
@NgModule({
    declarations: [CreateModifyUserDialogComponent, UsersInfoComponent],
    imports: [
        SharedModule,
        UserRoutingModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        DialogModule
    ]
})
export class UserModule {
}
