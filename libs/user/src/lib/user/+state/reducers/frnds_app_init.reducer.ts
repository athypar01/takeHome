import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { FrndsAppStateInterface, User } from '../../types/frnds-app-state.interface';
import * as frndsAppInitActions from '../actions/frnds_init.actions';
import * as frndsAppQueryActions from '../actions/frnds-query.actions';
import * as frndsAppNewUserActions from '../actions/frnds_new_user.actions';

export const FRNDS_APP_FEATURE_KEY = 'friends-app';

export const frndsAppAdapter: EntityAdapter<User> =
  createEntityAdapter<User>();

// set initial required properties
export const initialState: FrndsAppStateInterface = frndsAppAdapter.getInitialState({
  loaded: false,
  selectedId: null,
  error: null,
  editToggleStatus: false,
  isSubmitting: false,
  queryParam: null,
  isNew: null
});

const frndsAppInitReducer = createReducer(
  initialState,

  on(frndsAppInitActions.frndsAppInitAction, (state): FrndsAppStateInterface => ({
    ...state
  })),

  on(frndsAppInitActions.frndsAppInitSuccessAction, (state, { users }) =>
    frndsAppAdapter.setAll(users, { ...state, loaded: true })
  ),

  on(frndsAppInitActions.frndsAppInitFailureAction, (state, { error }): FrndsAppStateInterface => ({
     ...state, error
  })),

  on(frndsAppQueryActions.frndsAppQueryAction, (state, action): FrndsAppStateInterface => ({
    ...state, queryParam: action.query, users: null, loaded: false
  })),

  on(frndsAppQueryActions.frndsAppQueryActionSuccess, (state, { users }): FrndsAppStateInterface =>
    frndsAppAdapter.setAll(users, { ...state, loaded: true})
  ),

  on(frndsAppQueryActions.frndsAppQueryActionFailure, (state, { error }): FrndsAppStateInterface => ({
    ...state, error
  })),

  on(frndsAppNewUserActions.frndsAppNewUserClickAction, (state): FrndsAppStateInterface => ({
    ...state, isNew: true, loaded: false, queryParam: 'new', selectedId: 'new', editToggleStatus: false
  })),

  on(frndsAppNewUserActions.frndsAppNewUserCreateAction, (state): FrndsAppStateInterface => ({
    ...state
  })),

);

export function initReducer(state: FrndsAppStateInterface, action: Action) {
  return frndsAppInitReducer(state, action);
}
