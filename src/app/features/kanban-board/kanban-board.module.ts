import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../shared/material.module";
import {SharedModule} from "../../shared/shared.module";
import {BoardComponent} from "./board/board.component";
import {ListComponent} from "./list/list.component";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {TaskComponent} from "./task/task.component";


@NgModule({
    declarations: [BoardComponent, ListComponent, TaskComponent],
    exports: [BoardComponent, ListComponent],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        CdkDropList,
        CdkDrag
    ]
})
export class KanbanBoardModule {
}
