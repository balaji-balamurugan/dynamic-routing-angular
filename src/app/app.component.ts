import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuType, componentMap } from './app-routing.module';
import { map, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  burgerMenu!: MenuType['burgerMenu'];

  constructor(private router: Router, private http: HttpClient) {
    this.http
      .get<MenuType>('../assets/config.json')
      .pipe(
        tap((menus) => {
          this.burgerMenu = menus?.burgerMenu;
        }),
        map((response) => {
          const onlyInternalRoutes = [...response?.burgerMenu].filter(
            (eachMenu) => eachMenu?.urlType === 'internal'
          );
          return onlyInternalRoutes?.map(
            (menus) =>
              ({
                path: menus?.menuPath,
                component: componentMap[menus?.id],
              } as Route)
          );
        }),
        map((routes) => {
          return [
            {
              path: '',
              redirectTo: 'dashboard',
              pathMatch: 'full',
            },
            ...routes,
          ] as Route[];
        }),
        tap(console.log),
        take(1)
      )
      .subscribe((routes) => {
        this.router.resetConfig(routes);
      });
  }

  openUrl(menu: MenuType['burgerMenu']['0']): void {
    window.open(menu.menuPath, menu?.externalUrlTarget);
  }
}
