import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { FriendsAppStateInterface } from '../shared/user-state.interface';

import { User } from '../shared/users.interface';
import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'friends-app';

export const usersAdapter: EntityAdapter<User> =
  createEntityAdapter<User>();

// set initial required properties
export const initialState: FriendsAppStateInterface = usersAdapter.getInitialState({
  loaded: false,
  selectedId: null,
  error: null,
  editToggleStatus: false,
  isSubmitting: false
});

const usersReducer = createReducer(
  initialState,

  on(UsersActions.userPageInitAction, (state): FriendsAppStateInterface => ({
    ...state, loaded: true, error: null
  })),

  on(UsersActions.loadUsersAPISuccessAction, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, loaded: true })
  ),

  on(UsersActions.loadUsersAPIFailureAction, (state, { error }): FriendsAppStateInterface => ({
     ...state, error
  }))
);

export function reducer(state: FriendsAppStateInterface | undefined, action: Action) {
  return usersReducer(state, action);
}
