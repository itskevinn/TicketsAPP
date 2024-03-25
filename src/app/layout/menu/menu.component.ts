import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from "../service/layout.service";
import {AuthService} from "../../data/services/security/auth.service";
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

    model: any[] = [];

    constructor(public authService: AuthService) {
    }

    ngOnInit() {
        this.model = this.menuItems;
    }

    public get menuItems(): MenuItem[] {
        let items: MenuItem[] = [];
        let user = this.authService.currentUserValue;
        user?.roles?.forEach(r => {
            r.authorities?.forEach(a => {
                items.push(a);
            });
        });
        return items;
    }
}
