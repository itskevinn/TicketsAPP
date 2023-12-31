import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerService} from "./service/spinner.service";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {MenuService} from "../data/services/config/menu.service";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        ProgressSpinnerModule,
        HttpClientModule
    ],
    exports: [SpinnerComponent],
    providers: [SpinnerService, MenuService]
})
export class CoreModule {
}
