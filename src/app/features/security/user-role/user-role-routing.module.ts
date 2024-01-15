import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleInfoComponent } from './user-role-info/user-role-info.component';

const routes: Routes = [
  {
        path: '',
        component: UserRoleInfoComponent,
        data: {
          breadcrumb: 'Roles'
        },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleInfoRoutingModule { }
