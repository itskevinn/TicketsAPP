import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectsRoutingModule} from './projects-routing.module';
import {ProjectsComponent} from "./projects/projects.component";
import {SharedModule} from "../../../shared/shared.module";
import {CreateModifyProjectComponent} from "./create-modify-project/create-modify-project.component";


@NgModule({
  declarations: [ProjectsComponent, CreateModifyProjectComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule,
  ]
})
export class ProjectsModule {
}
