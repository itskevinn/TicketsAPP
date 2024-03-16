import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {DragDropModule} from "primeng/dragdrop";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    DragDropModule,
    MatTooltipModule,
    MatButtonModule,

  ],
  exports: [MatToolbarModule,
    MatIconModule,
    DragDropModule,
    MatTooltipModule,
    MatButtonModule]
})
export class MaterialModule {
}
