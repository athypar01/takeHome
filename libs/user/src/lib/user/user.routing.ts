import { Route } from '@angular/router';
import { UserComponent } from './user.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { UserByIdResolver, UserListResolver } from './user.resolver';
import { UserGuard } from './user.guard';

export const userRoutes: Route[] = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        resolve: {
          task: UserListResolver,
        },
        children: [
          {
            path: ':id',
            component: DetailsComponent,
            resolve: {
              task: UserByIdResolver,
            },
            canDeactivate: [UserGuard]
          },
        ],
      },
    ],
  },
];
