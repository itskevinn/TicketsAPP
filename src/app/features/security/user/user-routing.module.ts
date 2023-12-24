import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersInfoComponent} from "./users-info/users-info.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
        component: UsersInfoComponent
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class UserRoutingModule {
}
