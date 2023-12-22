import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faPlus,
    faEdit,
    faTrash,
    faTimes,
    faCaretUp,
    faCaretDown,
    faExclamationTriangle,
    faFilter,
    faTasks,
    faCheck,
    faSquare,
    faLanguage,
    faPaintBrush,
    faLightbulb,
    faWindowMaximize,
    faStream,
    faBook,
    faUserCircle,
    faAsterisk,
    faSearch,
    faHospitalUser,
    faStethoscope,
    faHome,
    faHospital,
    faCoins,
    faCalendarCheck,
    faList,
    faSchool,
    faChalkboardUser,
    faUserGraduate,
    faChalkboard
} from '@fortawesome/free-solid-svg-icons';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppComponent} from '../app.component';
import {PrimeNgModule} from './prime-ng.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FontAwesomeModule,
        PrimeNgModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FontAwesomeModule,
        PrimeNgModule
    ],
    bootstrap: [AppComponent]
})
export class SharedModule {
    constructor(faIconLibrary: FaIconLibrary) {
        faIconLibrary.addIcons(
            faPlus,
            faEdit,
            faTrash,
            faTimes,
            faCaretUp,
            faCaretDown,
            faExclamationTriangle,
            faFilter,
            faTasks,
            faCheck,
            faSquare,
            faLanguage,
            faPaintBrush,
            faLightbulb,
            faWindowMaximize,
            faStream,
            faBook,
            faUserCircle,
            faAsterisk,
            faSearch,
            faHospitalUser,
            faStethoscope,
            faHospital,
            faCoins,
            faCalendarCheck,
            faHome,
            faList,
            faSchool,
            faChalkboardUser,
            faUserGraduate,
            faChalkboard
        );
    }
}
