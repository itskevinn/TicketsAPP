import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../data/services/security/auth.service";
import {MenuItem} from "primeng/api";
import {MenuService} from "../../data/services/config/menu.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService) {
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

  ngOnInit(): void {

  }

  private logout(): void {
    this.authService.logout();
  }

}
