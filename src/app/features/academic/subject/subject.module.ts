import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ViewSubjectComponent} from './view-subject/view-subject.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SharedModule} from "../../../shared/shared.module";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {SubjectRoutingModule} from "./subject-routing.module";
import {CreateSubjectComponent} from "./create-subject/create-subject.component";
import {ClassGroupModule} from "../class-group/class-group.module";

@NgModule({
  declarations: [
    ViewSubjectComponent,
    CreateSubjectComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClassGroupModule,
    SubjectRoutingModule
  ],
  providers: [ConfirmationService, MessageService, DynamicDialogRef]
})
export class SubjectModule {
}
