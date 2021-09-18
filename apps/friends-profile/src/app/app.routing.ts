import { NgModule } from '@angular/core';
import { Route, ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { LayoutComponent } from '@secureworks/layout';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'user' },
  // Auth routes for guests
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('@secureworks/user').then(
            (m) => m.UserModule
          ),
      }
    ]
  }
];

const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: PreloadAllModules,
  relativeLinkResolution: 'legacy',
};

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, routerConfig)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
