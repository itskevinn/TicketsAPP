import {NgModule} from '@angular/core';
import {TicketComponent} from "./ticket/ticket.component";
import {TicketsInfoComponent} from "./tickets-info/tickets-info.component";
import {CreateModifyTicketComponent} from "./create-modify-ticket/create-modify-ticket.component";
import {SharedModule} from "../../../shared/shared.module";
import {MaterialModule} from "../../../shared/material.module";
import {BoardComponent} from "./board/board.component";


@NgModule({
  declarations: [
    BoardComponent,
    TicketComponent,
    TicketsInfoComponent,
    CreateModifyTicketComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
  ]
})
export class TicketsModule {
}
