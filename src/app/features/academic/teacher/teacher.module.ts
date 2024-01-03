import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeacherRoutingModule} from './teacher-routing.module';
import {SharedModule} from "../../../shared/shared.module";
import {TeachersInfoComponent} from "./teachers-info/teachers-info.component";


@NgModule({
    declarations: [TeachersInfoComponent],
    imports: [
        CommonModule,
        SharedModule,
        TeacherRoutingModule
    ]
})
export class TeacherModule {
}
