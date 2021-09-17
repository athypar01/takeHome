import { Route } from '@angular/router';
import { UserComponent } from './user.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';

export const userRoutes: Route[] = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        children: [
          {
            path: ':id',
            component: DetailsComponent,
          },
        ],
      },
    ],
  },
];
