import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TicketsInfoComponent} from "./tickets-info/tickets-info.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: TicketsInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {
}
