import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ViewSubjectComponent} from './view-subject/view-subject.component';
import {CreateSubjectComponent} from './create-subject/create-subject.component';

const routes = [
  {
    path: '',
    component: ViewSubjectComponent,
    data: {
      breadcrumb: 'Asignaturas'
    }
  },
  {
    path: ':subjectId',
    component: CreateSubjectComponent,
    data: {
      breadcrumb: 'Gestionar Asignatura'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule {
}
