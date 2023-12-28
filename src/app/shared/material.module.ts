import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {DragDropModule} from "primeng/dragdrop";
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        DragDropModule
    ],
    exports: [MatToolbarModule,
        MatIconModule,
        DragDropModule]
})
export class MaterialModule {
}
