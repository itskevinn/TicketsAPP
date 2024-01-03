import {NgModule} from '@angular/core';

import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {HomeComponent} from "./home/home.component";
import {KanbanBoardModule} from "../tickets/kanban-board.module";

const components = [MatToolbarModule, MatIconModule];

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        SharedModule,
        HomeRoutingModule,
        KanbanBoardModule
    ],
    exports: components
})
export class HomeModule {
}
