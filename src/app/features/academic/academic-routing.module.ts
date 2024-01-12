import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'teachers',
        loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
        data: {
          breadcrumb: 'Académico'
        },
      },
      {
        path: 'students',
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
        data: {
          breadcrumb: 'Académico'
        },
      },
      {
        path: 'subjects',
        loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule),
        data: {
          breadcrumb: 'Académico'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicRoutingModule {
}
