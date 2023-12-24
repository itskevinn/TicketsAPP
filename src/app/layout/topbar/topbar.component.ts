import {Component, ElementRef, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {LayoutService} from "../service/layout.service";
import {AuthService} from "../../data/services/security/auth.service";
@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html'
})
export class TopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private authService: AuthService) {
    }
    public logout(): void {
        this.authService.logout();
      }
}
