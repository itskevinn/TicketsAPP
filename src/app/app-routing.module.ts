import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";
import {AuthGuard} from "./core/guards/auth.guard";

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
                path: 'students',
                loadChildren: () => import('./features/academic/student/student.module').then(m => m.StudentModule)
            },
            {
                path: 'teachers',
                loadChildren: () => import('./features/academic/teacher/teacher.module').then(m => m.TeacherModule)
            },

        ]
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
