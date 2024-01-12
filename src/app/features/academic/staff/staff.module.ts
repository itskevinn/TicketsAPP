import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreatePersonComponent} from "./create-person/create-person.component";
import {SharedModule} from "../../../shared/shared.module";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";



@NgModule({
  declarations: [CreatePersonComponent],
  exports:[CreatePersonComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConfirmDialogModule,
    DialogModule,
  ]
})
export class StaffModule { }
