import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AcademicRoutingModule} from './academic-routing.module';
import {CreatePersonComponent} from "./staff/create-person/create-person.component";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {TeacherModule} from "./teacher/teacher.module";


@NgModule({
  imports: [
    CommonModule,
    TeacherModule,
    AcademicRoutingModule,
    ButtonModule,
    InputTextModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    RippleModule
  ]
})
export class AcademicModule {
}
