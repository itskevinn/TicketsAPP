import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ViewSubjectComponent} from './view-subject/view-subject.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SharedModule} from "../../../shared/shared.module";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {SubjectRoutingModule} from "./subject-routing.module";
import {CreateSubjectComponent} from "./create-subject/create-subject.component";
import {ClassGroupModule} from "../class-group/class-group.module";
import {StudentModule} from "../student/student.module";
import {ViewSubjectDetailComponent} from "./view-subject-detail/view-subject-detail.component";
import {FileUploadModule} from "primeng/fileupload";

@NgModule({
  declarations: [
    ViewSubjectComponent,
    CreateSubjectComponent,
    ViewSubjectDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClassGroupModule,
    SubjectRoutingModule,
    StudentModule,
    FileUploadModule
  ],
  providers: [ConfirmationService, MessageService, DynamicDialogRef]
})
export class SubjectModule {
}
