import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {RegisterUserComponent} from "./features/register/register/register-user.component";

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
        loadChildren: () =>
          import('./features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/tickets/ticket/ticket.module').then(m => m.TicketModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./features/security/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'subjects',
        loadChildren: () => import('./features/subject/subject.module').then(m => m.SubjectModule)
      }
    ]
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    loadChildren: () =>
      import('./features/register/register.module').then(m => m.RegisterModule)
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
