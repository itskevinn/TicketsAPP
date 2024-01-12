import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentRoutingModule} from './student-routing.module';
import {SharedModule} from "../../../shared/shared.module";
import {StudentsInfoComponent} from "./students-info/students-info.component";
import {PaginatorModule} from "primeng/paginator";


@NgModule({
    declarations: [StudentsInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    StudentRoutingModule,
    PaginatorModule,
  ]
})
export class StudentModule {
}
