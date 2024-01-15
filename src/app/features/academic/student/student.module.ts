import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentRoutingModule} from './student-routing.module';
import {SharedModule} from "../../../shared/shared.module";
import {StudentsInfoComponent} from "./students-info/students-info.component";
import {PaginatorModule} from "primeng/paginator";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {ToolbarModule} from "primeng/toolbar";
import {StaffModule} from "../staff/staff.module";


@NgModule({
    declarations: [StudentsInfoComponent],
    imports: [
        CommonModule,
        SharedModule,
        StudentRoutingModule,
        PaginatorModule,
        DialogModule,
        FileUploadModule,
        ToolbarModule,
        StaffModule,
    ]
})
export class StudentModule {
}
