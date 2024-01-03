import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentsInfoComponent} from "./students-info/students-info.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  },
  {
    path: '',
    component: StudentsInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
