import { NgModule } from '@angular/core';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketsInfoComponent } from './tickets-info/tickets-info.component';
import { CreateModifyTicketComponent } from './create-modify-ticket/create-modify-ticket.component';
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [
    TicketsInfoComponent,
    CreateModifyTicketComponent
  ],
  imports: [
    SharedModule,
    TicketRoutingModule
  ]
})
export class TicketModule { }
