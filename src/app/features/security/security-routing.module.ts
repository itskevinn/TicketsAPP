import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
        path: '',
        children: [
      {
        path: 'role',
        loadChildren: () => import('./user-role/user-role.module').then(m => m.UserRoleInfoModule),
        data: {
          breadcrumb: 'Seguridad'
        },
      },
      {
        path: 'info',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: {
          breadcrumb: 'Seguridad'
        },
      },
      {
        path: 'settings',
        loadChildren: () => import('./user-settings/user-settings.module').then(m => m.UserSettingsModule),
        data: {
          breadcrumb: 'Seguridad'
        },
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
