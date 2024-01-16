import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateClassGroupComponent} from "./create-class-group/create-class-group.component";
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [CreateClassGroupComponent],
  exports: [CreateClassGroupComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ClassGroupModule {
}
