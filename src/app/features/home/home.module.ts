import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../../shared/shared.module";
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

const components = [MatToolbarModule, MatIconModule];

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    TaskComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    MatIconModule
  ],
  exports: components
})
export class HomeModule { }
