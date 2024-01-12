import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from "../../../shared/shared.module";
import {PaginatorModule} from "primeng/paginator";
import {TeachersInfoComponent} from "./teachers-info/teachers-info.component";
import {CreateModifyTeacherComponent} from "./create-modify-teacher/create-modify-teacher.component";
import {TeacherRoutingModule} from "./teacher-routing.module";
import {StaffModule} from "../staff/staff.module";
import {DialogModule} from "primeng/dialog";


@NgModule({
  declarations: [TeachersInfoComponent, CreateModifyTeacherComponent],
  imports: [
    CommonModule,
    SharedModule,
    TeacherRoutingModule,
    PaginatorModule,
    StaffModule,
    DialogModule
  ]
})
export class TeacherModule {
}
