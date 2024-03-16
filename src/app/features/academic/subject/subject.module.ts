import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ViewSubjectComponent} from './view-subject/view-subject.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SharedModule} from "../../../shared/shared.module";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {SubjectRoutingModule} from "./subject-routing.module";
import {CreateSubjectComponent} from "./create-subject/create-subject.component";
import {ViewSubjectDetailComponent} from "./view-subject-detail/view-subject-detail.component";
import {FileUploadModule} from "primeng/fileupload";
import {ViewClassGroupDetailComponent} from "./view-class-group-detail/view-class-group-detail.component";
import {CreateClassGroupComponent} from "./create-class-group/create-class-group.component";
import {StudentModule} from "../student/student.module";

@NgModule({
  declarations: [
    ViewSubjectComponent,
    CreateSubjectComponent,
    ViewSubjectDetailComponent,
    ViewClassGroupDetailComponent,
    CreateClassGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FileUploadModule,
    SubjectRoutingModule,
    StudentModule,
  ],
  providers: [ConfirmationService, MessageService, DynamicDialogRef]
})
export class SubjectModule {
}
