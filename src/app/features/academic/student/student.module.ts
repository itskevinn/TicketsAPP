import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentRoutingModule} from './student-routing.module';
import {SharedModule} from "../../../shared/shared.module";
import {StudentsInfoComponent} from "./students-info/students-info.component";


@NgModule({
    declarations: [StudentsInfoComponent],
    imports: [
        CommonModule,
        SharedModule,
        StudentRoutingModule
    ]
})
export class StudentModule {
}
