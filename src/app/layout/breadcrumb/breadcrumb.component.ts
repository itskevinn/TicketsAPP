import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {isNullOrUndefined} from "../../shared/functions/functions";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  static readonly ROUTE_DATA_BREADCRUMB_LABEL = 'breadcrumb';
  static readonly ROUTE_DATA_BREADCRUMB_URL = 'url';
  readonly home = {icon: 'fa-solid fa-home', url: 'home'};
  menuItems: MenuItem[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.menuItems = this.createBreadcrumbs(this.activatedRoute.root));
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB_LABEL];
      if (!isNullOrUndefined(label) && !isNullOrUndefined(BreadcrumbComponent.ROUTE_DATA_BREADCRUMB_URL)) {
        breadcrumbs.push({label, url});
      } else if (!isNullOrUndefined(label)) {
        breadcrumbs.push({label});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return [];
  }
}
