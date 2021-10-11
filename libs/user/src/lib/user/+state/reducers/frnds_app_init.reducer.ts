import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { FrndsAppStateInterface, User } from '../../types/frnds-app-state.interface';
import * as frndsAppDeleteActions from '../actions/frnds_detail.actions';
import * as frndsAppInitActions from '../actions/frnds_init.actions';
import * as frndsAppQueryActions from '../actions/frnds-query.actions';
import * as frndsAppNewUserActions from '../actions/frnds_new_user.actions';
import * as frndsAppSelectUserActions from '../actions/frnds_select_user.actions';
import * as FrndsAppDetailActionTypes from '../actions/frnds_detail.actions';

export const FRNDS_APP_FEATURE_KEY = 'friends-app';

export const frndsAppAdapter: EntityAdapter<User> = createEntityAdapter<User>();

// set initial required properties
export const initialState: FrndsAppStateInterface = frndsAppAdapter.getInitialState({
  loaded: false,
  selectedUserId: null,
  error: null,
  editToggleStatus: false,
  isSubmitting: false,
  queryParam: null,
  isNew: null,
  validationErrors: null
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
    frndsAppAdapter.setAll(users, { ...state, loaded: true })
  ),

  on(frndsAppQueryActions.frndsAppQueryActionFailure, (state, { error }): FrndsAppStateInterface => ({
    ...state, error
  })),

  on(frndsAppNewUserActions.frndsAppNewUserClickAction, (state): FrndsAppStateInterface => ({
    ...state, isNew: true, loaded: false, queryParam: 'new', selectedUserId: 'new', editToggleStatus: true
  })),

  on(frndsAppNewUserActions.frndsAppNewUserCreateAction, (state): FrndsAppStateInterface => ({
    ...state, isSubmitting: true
  })),

  on(frndsAppNewUserActions.addNewUser, (state, { user }): FrndsAppStateInterface =>
    frndsAppAdapter.setOne(user, { ...state, isNew: false, loaded: true, queryParam: null, editToggleStatus: false, isSubmitting: false })
  ),

  on(frndsAppNewUserActions.addNewUserSuccessAction, (state, { users }): FrndsAppStateInterface =>
    frndsAppAdapter.setAll(users, { ...state, isNew: false, loaded: true, queryParam: null, editToggleStatus: false, isSubmitting: false })
  ),

  on(frndsAppNewUserActions.addNewUserFailureAction, (state, { error }): FrndsAppStateInterface => ({
    ...state, error, isSubmitting: false
  })),

  on(frndsAppSelectUserActions.frndsAppSelectUserClickAction, (state, { query }): FrndsAppStateInterface => ({
    ...state, isNew: false, loaded: false, queryParam: query, selectedUserId: query, editToggleStatus: false, user: state.user
  })),

  on(frndsAppSelectUserActions.frndsAppSelectUserClickAction, (state, { query }): FrndsAppStateInterface => ({
    ...state, isNew: false, loaded: false, queryParam: query, selectedUserId: query, editToggleStatus: false, user: state.user
  })),

  on(frndsAppSelectUserActions.loadSelectedUserSuccessAction, (state, { user: user }): FrndsAppStateInterface =>
    frndsAppAdapter.setOne(user, { ...state, isNew: false, loaded: true, queryParam: null, selectedUserId: null, user: user, editToggleStatus: false, isSubmitting: false })
  ),

  on(frndsAppSelectUserActions.loadSelectedUserFailureAction, (state, { error }): FrndsAppStateInterface => ({
    ...state, error
  })),

  on(frndsAppSelectUserActions.frndsAppUpdateUserEditAction, (state, { user }): FrndsAppStateInterface => ({
    ...state, queryParam: state.selectedUserId, selectedUserId: state.selectedUserId, editToggleStatus: true
  })),

  on(frndsAppDeleteActions.deleteExistingUser, (state, {id: id}): FrndsAppStateInterface => ({
    ...state, queryParam: id, selectedUserId: id, editToggleStatus: true
  })),

  on(frndsAppDeleteActions.deleteExistingUserSuccessAction, (state, {users: users}): FrndsAppStateInterface => ({
    ...state, queryParam: null, selectedUserId: null, editToggleStatus: false, users: users
  })),

  on(frndsAppDeleteActions.deleteExistingUserFailureAction, (state, {error}): FrndsAppStateInterface => ({
    ...state, error, editToggleStatus: true
  })),

  on(FrndsAppDetailActionTypes.clearUserSelection, (state): FrndsAppStateInterface => ({
    ...state, queryParam: null, selectedUserId: null, editToggleStatus: false
  }))
);

export function initReducer(state: FrndsAppStateInterface, action: frndsAppSelectUserActions.UserActionsUnion): FrndsAppStateInterface {
  switch (action.type) {
    case frndsAppSelectUserActions.UserActionTypes.ADD_USER: {
      return frndsAppAdapter.addOne(
        action.payload.user,
        {
          ...state,
          editToggleStatus: true,
          selectedUserId: action.payload.user.id
        });
    }
    case frndsAppSelectUserActions.UserActionTypes.UPSERT_USER: {
      return frndsAppAdapter.upsertOne(action.payload.user, state);
    }
    case frndsAppSelectUserActions.UserActionTypes.ADD_USERS: {
      return frndsAppAdapter.addMany(action.payload.users, state);
    }
    case frndsAppSelectUserActions.UserActionTypes.UPSERT_USERS: {
      return frndsAppAdapter.upsertMany(action.payload.users, state);
    }
    case frndsAppSelectUserActions.UserActionTypes.UPDATE_USER: {

      return frndsAppAdapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload
        },
        {
          ...state,
          editToggleStatus: false,
          selectedUserId: action.payload.id
        }
      );
    }
    case frndsAppSelectUserActions.UserActionTypes.UPDATE_USERS: {
      return frndsAppAdapter.updateMany(action.payload.users, state);
    }
    case frndsAppSelectUserActions.UserActionTypes.DELETE_USER: {
      return frndsAppAdapter.removeOne(action.payload.id, state);
    }
    case frndsAppSelectUserActions.UserActionTypes.DELETE_USERS: {
      return frndsAppAdapter.removeMany(action.payload.ids, state);
    }
    case frndsAppSelectUserActions.UserActionTypes.LOAD_USERS: {
      return frndsAppAdapter.addMany(action.payload.users, state);
    }
    case frndsAppSelectUserActions.UserActionTypes.CLEAR_USERS: {
      return frndsAppAdapter.removeAll({ ...state, selectedUserId: null });
    }
    default:
      return frndsAppInitReducer(state, action);
  }
}

export const getSelectedUserId = (state: FrndsAppStateInterface) => state.selectedUserId;

export const userEntitySelectors = frndsAppAdapter.getSelectors();
