import { Route } from '@angular/router';

import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';
import { UserComponent } from './components/user.component';
import { UserGuard } from './guards/user.guard';

export const userRoutes: Route[] = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'frnds-app',
        component: ListComponent,
        children: [
          {
            path: ':id',
            component: DetailsComponent,
            canDeactivate: [UserGuard]
          },
        ],
      },
    ],
  },
];
