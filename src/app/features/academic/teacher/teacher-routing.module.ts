import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeachersInfoComponent} from "./teachers-info/teachers-info.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'teachers',
    pathMatch: 'full',
  },
  {
    path: '',
    data: {
      breadcrumb: 'Profesores',
      url: 'academic/teachers'
    },
    component: TeachersInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
