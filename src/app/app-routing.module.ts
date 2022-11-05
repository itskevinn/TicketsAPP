import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";

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
        path: 'tickes',
        loadChildren: () => import('./features/tickets/ticket/ticket.module').then(m => m.TicketModule)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
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
