import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersInfoComponent} from "./users-info/users-info.component";

const routes: Routes = [{
  path: '',
  redirectTo: '',
  pathMatch: 'full',
  component: UsersInfoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
