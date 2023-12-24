import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component"; 

const routes: Routes = [
  {
  path: '',
  redirectTo: 'home',  // Redirige a la ruta 'home'
  pathMatch: 'full'
  },
  {
    path: '',  // Agrega una ruta específica para 'home'
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
