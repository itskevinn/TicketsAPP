import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectsComponent } from './proyects/proyects.component';

const routes: Routes = [
  {
    path: '',
    component: ProyectsComponent,
    data: {
      breadcrumb: 'proyectos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectsRoutingModule { }
