import { NgModule } from '@angular/core';
import { Route, ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { LayoutComponent } from '@secureworks/layout';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'frnds-app' },
  // Auth routes for guests
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@secureworks/frnds-app').then(
            (m) => m.FrndsAppModule
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
