import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../shared/material.module";
import {SharedModule} from "../../shared/shared.module";
import {BoardComponent} from "./kanban-board/board/board.component";
import {ListComponent} from "./kanban-board/list/list.component";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {TicketComponent} from "./kanban-board/ticket/ticket.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
    declarations: [BoardComponent, ListComponent, TicketComponent],
    exports: [BoardComponent, ListComponent],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        CdkDropList,
        CdkDrag,
        MatTooltipModule,
        MatButtonModule
    ]
})
export class KanbanBoardModule {
}
