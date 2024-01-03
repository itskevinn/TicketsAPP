import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'teachers',
        loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule)
      },
      {
        path: 'students',
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
      },
      {
        path: 'subjects',
        loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule)
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
