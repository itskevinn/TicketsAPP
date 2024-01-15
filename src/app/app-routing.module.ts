import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {RegisterUserComponent} from "./features/security/register/register-user/register-user.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'academic',
        loadChildren: () =>
          import('./features/academic/academic.module').then(m => m.AcademicModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./features/security/security.module').then(m => m.SecurityModule),
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/proyects/proyects.module').then(m => m.ProyectsModule)
      }
    ]
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    loadChildren: () =>
      import('./features/security/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/security/auth/auth.module').then(m => m.AuthModule)
  },
  {path: '**', redirectTo: '/auth/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
