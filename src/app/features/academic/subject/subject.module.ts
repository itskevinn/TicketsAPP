import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubjectRoutingModule} from './subject-routing.module';
import {ViewSubjectComponent} from './view-subject/view-subject.component';
import {DropdownModule} from 'primeng/dropdown';
import {OrderListModule} from 'primeng/orderlist';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ButtonModule} from 'primeng/button';
import {CreateSubjectComponent} from './create-subject/create-subject.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';
import {StepsModule} from 'primeng/steps';
import {DataViewModule} from "primeng/dataview";
import {EditSubjectComponent} from "./edit-subject/edit-subject.component";
import {SharedModule} from "../../../shared/shared.module";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToolbarModule} from "primeng/toolbar";

@NgModule({
  declarations: [
    ViewSubjectComponent,
    CreateSubjectComponent,
    EditSubjectComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    SharedModule,
    DropdownModule,
    OrderListModule,
    ConfirmDialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PanelModule,
    MultiSelectModule,
    TableModule,
    StepsModule,
    DataViewModule,
    SharedModule,
    SharedModule,
    InputTextareaModule,
    ToolbarModule
  ],
  exports: [ButtonModule],
  providers: [ConfirmationService, MessageService]
})
export class SubjectModule {
}
