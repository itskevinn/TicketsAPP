import {Component, ElementRef} from '@angular/core';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    constructor(public el: ElementRef) {

    }
}

