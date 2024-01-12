import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewSubjectComponent} from './view-subject/view-subject.component';
import {EditSubjectComponent} from './edit-subject/edit-subject.component';
import {CreateSubjectComponent} from './create-subject/create-subject.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'subjects',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ViewSubjectComponent,
    data: {
      breadcrumb: 'Asignaturas'
    },
    children: [
      {
        path: 'edit/:subject',
        component: EditSubjectComponent,
        data: {
          breadcrumb: 'Editar Asignatura'
        },
        pathMatch: 'prefix'
      },
      {
        path: 'create',
        component: CreateSubjectComponent,
        data: {
          breadcrumb: 'Crear Asignatura'
        },
        pathMatch: 'prefix'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule {
}
