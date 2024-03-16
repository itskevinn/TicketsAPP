import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewSubjectComponent} from './view-subject/view-subject.component';
import {ViewSubjectDetailComponent} from "./view-subject-detail/view-subject-detail.component";
import {ViewClassGroupDetailComponent} from "./view-class-group-detail/view-class-group-detail.component";

const routes: Routes = [
  {
    path: '',
    component: ViewSubjectComponent,
    data: {
      breadcrumb: 'Asignaturas'
    },
  },
  {
    path: ':subjectId/groups',
    component: ViewSubjectDetailComponent,
    data: {
      breadcrumb: 'Grupos de Asignatura'
    },
  },
  {
    path: ':subjectId/groups/:groupId',
    component: ViewClassGroupDetailComponent,
    data: {
      breadcrumb: 'Grupos de Asignatura'
    },
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule {
}
