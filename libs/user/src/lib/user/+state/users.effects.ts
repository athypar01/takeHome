import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(UsersActions.init, {
      run: (
        action: ReturnType<typeof UsersActions.init>,
        state: UsersFeature.UsersPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return UsersActions.loadUsersSuccess({ users: [] });
      },
      onError: (action: ReturnType<typeof UsersActions.init>, error) => {
        console.error('Error', error);
        return UsersActions.loadUsersFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<UsersFeature.UsersPartialState>
  ) {}
}
