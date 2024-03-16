import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from './projects/projects.component';
import {BoardComponent} from "../tickets/board/board.component";

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    data: {
      breadcrumb: 'Proyectos'
    }
  },
  {
    path: ':projectId/board',
    component: BoardComponent,
    data: {
      breadcrumb: 'Tablero'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
