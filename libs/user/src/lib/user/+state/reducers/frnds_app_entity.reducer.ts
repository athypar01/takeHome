
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";

import { FrndsAppStateInterface, User } from "../../types/frnds_app_state.interface";
import * as frndsAppEntiyUserActions from '../actions/frnds_app_entity.actions';
import * as frndsAppHTTPUserActions from '../actions/frnds_app_http.actions';

export const getSelectedUserId = (state: FrndsAppStateInterface) => state.selectedUserId;

export const frndsAppAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const userEntitySelectors = frndsAppAdapter.getSelectors();

export const FRNDS_APP_FEATURE_KEY = 'friends-app';

// set initial required properties
export const initialState: FrndsAppStateInterface = frndsAppAdapter.getInitialState({
  loaded: false,
  editToggleStatus: false,
  isSubmitting: false,
  isNew: false,
  queryParam: null,
  selectedUserId: null,
  error: null,
  users: undefined
});

const frndsAppInitReducer = createReducer(
  initialState,

  on(frndsAppHTTPUserActions.initFrndsApp, (state): FrndsAppStateInterface => ({
    ...state, editToggleStatus: false, queryParam: null
  })),

  on(frndsAppHTTPUserActions.initFrndsAppSuccess, (state, { users }) =>
    frndsAppAdapter.setAll(users, { ...state, loaded: true, editToggleStatus: false })
  ),

  on(frndsAppHTTPUserActions.initFrndsAppFailure, (state, { error }): FrndsAppStateInterface => ({
    ...state, error
  })),

  on(frndsAppHTTPUserActions.initFrndsApp, (state): FrndsAppStateInterface => ({
    ...state, editToggleStatus: false, queryParam: null
  })),

  on(frndsAppHTTPUserActions.initFrndsAppSuccess, (state, { users }) =>
    frndsAppAdapter.setAll(users, { ...state, loaded: true, editToggleStatus: false , users: users})
  ),

  on(frndsAppHTTPUserActions.initFrndsAppFailure, (state, { error }): FrndsAppStateInterface => ({
    ...state, error, editToggleStatus: false, queryParam: null, isNew: false, isSubmitting: false, loaded: false
  })),

  on(frndsAppHTTPUserActions.getAllUsers, (state): FrndsAppStateInterface => ({
    ...state, editToggleStatus: false, queryParam: null, isNew: false, isSubmitting: false, loaded: false
  })),

  on(frndsAppHTTPUserActions.getAllUsersSuccess, (state, { users }) =>
    frndsAppAdapter.setAll(users, { ...state, editToggleStatus: false, queryParam: null, isNew: false, isSubmitting: false, loaded: true, users: users})
  ),

  on(frndsAppHTTPUserActions.getAllUsersFailure, (state, { error }): FrndsAppStateInterface => ({
    ...state, error, editToggleStatus: false, queryParam: null, isNew: false, isSubmitting: false, loaded: false
  })),

  on(frndsAppHTTPUserActions.getUserById, (state, action): FrndsAppStateInterface => ({
    ...state, queryParam:null, selectedUserId: action.id, loaded: false, editToggleStatus: false, isNew: false, isSubmitting: false
  })),

  on(frndsAppHTTPUserActions.getUserByIdSuccess, (state, { user: user }): FrndsAppStateInterface =>
    frndsAppAdapter.setOne(user, { ...state, isNew: false, loaded: true, queryParam: null, editToggleStatus: false, isSubmitting: false })
  ),

  on(frndsAppHTTPUserActions.getUserByIdFailure, (state, { error }): FrndsAppStateInterface => ({
    ...state, error, editToggleStatus: false, queryParam: null, isNew: false, isSubmitting: false, loaded: false
  })),

  on(frndsAppHTTPUserActions.getUserByQuery, (state, action): FrndsAppStateInterface => ({
    ...state, queryParam: action.query, loaded: false, editToggleStatus: false, isNew: false, isSubmitting: false
  })),

  on(frndsAppHTTPUserActions.getUserByQuerySuccess, (state, { users }): FrndsAppStateInterface => ({
    ...state, isNew: false, loaded: true, queryParam: null, editToggleStatus: false, isSubmitting: false, users: users
  })),

  on(frndsAppHTTPUserActions.getUserByQueryFailure, (state, { error }): FrndsAppStateInterface => ({
    ...state, error, editToggleStatus: false, queryParam: null, isNew: false, isSubmitting: false, loaded: false
  })),

  on(frndsAppHTTPUserActions.getUserByIdFailure, (state, { error }): FrndsAppStateInterface => ({
    ...state, error, editToggleStatus: false, queryParam: null, isNew: false, isSubmitting: false, loaded: false
  })),

  on(frndsAppHTTPUserActions.addNewUserTrigger, (state): FrndsAppStateInterface => ({
    ...state, isNew: true, loaded: false, queryParam: 'new', selectedUserId: 'new', editToggleStatus: true, isSubmitting: false
  })),

  on(frndsAppHTTPUserActions.addNewUser, (state, {user}): FrndsAppStateInterface =>
    frndsAppAdapter.setOne(user, { ...state, isNew: true, loaded: true, queryParam: user.id, selectedUserId: user.id, editToggleStatus: true, isSubmitting: true })
  ),

  on(frndsAppHTTPUserActions.addNewUserSuccessAction, (state, { users }): FrndsAppStateInterface =>
    frndsAppAdapter.setAll(users, { ...state, isNew: false, loaded: false, queryParam: state.queryParam, editToggleStatus: false, isSubmitting: false })
  ),

  on(frndsAppHTTPUserActions.addNewUserFailureAction, (state, { error }): FrndsAppStateInterface => ({
    ...state, error, isNew: true, loaded: false, queryParam: null, editToggleStatus: true, isSubmitting: false
  })),

  on(frndsAppHTTPUserActions.editExistingUserTrigger, (state, { id }): FrndsAppStateInterface => ({
    ...state, isNew: false, loaded: false, queryParam: null, selectedUserId: id, editToggleStatus: true, isSubmitting: false
  })),

  on(frndsAppHTTPUserActions.editExistingUser, (state, { id }): FrndsAppStateInterface => ({
    ...state, isNew: false, loaded: true, queryParam: null, selectedUserId: id, editToggleStatus: true, isSubmitting: true
  })),

  on(frndsAppHTTPUserActions.editExistingUserFailureAction, (state, { error }): FrndsAppStateInterface => ({
    ...state, error, isNew: true, loaded: false, queryParam: null, editToggleStatus: true, isSubmitting: false
  })),

  on(frndsAppHTTPUserActions.deleteExistingUser, (state, {id: id}): FrndsAppStateInterface => ({
    ...state, queryParam: id, editToggleStatus: true, loaded: true, isNew: false, isSubmitting: true
  })),

  on(frndsAppHTTPUserActions.deleteExistingUserSuccessAction, (state): FrndsAppStateInterface => ({
    ...state, queryParam: null, editToggleStatus: false, isSubmitting: false, isNew: false, loaded: false
  })),

  on(frndsAppHTTPUserActions.deleteExistingUserFailureAction, (state, {error}): FrndsAppStateInterface => ({
    ...state, error, queryParam: state.queryParam, editToggleStatus: true, isNew: false, loaded: false, isSubmitting: true
  })),

  on(frndsAppHTTPUserActions.clearUserSelection, (state): FrndsAppStateInterface => ({
    ...state, editToggleStatus: false
  }))
);

export function initReducer(state: FrndsAppStateInterface, action: frndsAppEntiyUserActions.UserActionsUnion): FrndsAppStateInterface {
  switch (action.type) {

    case frndsAppEntiyUserActions.UserActionTypes.ADD_USER: {
      return frndsAppAdapter.addOne(
        action.payload.user,
        {
          ...state,
          editToggleStatus: false,
          selectedUserId: action.payload.user.id
        });
    }

    case frndsAppEntiyUserActions.UserActionTypes.UPSERT_USER: {
      return frndsAppAdapter.upsertOne(action.payload.user, state);
    }

    case frndsAppEntiyUserActions.UserActionTypes.ADD_USERS: {
      return frndsAppAdapter.addMany(action.payload.users, state);
    }

    case frndsAppEntiyUserActions.UserActionTypes.UPSERT_USERS: {
      return frndsAppAdapter.upsertMany(action.payload.users, state);
    }

    case frndsAppEntiyUserActions.UserActionTypes.UPDATE_USER: {
      return frndsAppAdapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload
        },
        {
          ...state,
          editToggleStatus: false,
          selectedUserId: action.payload.id
        },
      );
    }

    case frndsAppEntiyUserActions.UserActionTypes.UPDATE_USERS: {
      return frndsAppAdapter.updateMany(action.payload.users, state);
    }

    case frndsAppEntiyUserActions.UserActionTypes.DELETE_USER: {
      return frndsAppAdapter.removeOne(action.payload.id, state);
    }

    case frndsAppEntiyUserActions.UserActionTypes.DELETE_USERS: {
      return frndsAppAdapter.removeMany(action.payload.ids, state);
    }

    case frndsAppEntiyUserActions.UserActionTypes.LOAD_USERS: {
      return frndsAppAdapter.addMany(action.payload.users, state);
    }

    case frndsAppEntiyUserActions.UserActionTypes.CLEAR_USERS: {
      return frndsAppAdapter.removeAll({ ...state, selectedUserId: null });
    }

    default:
      return frndsAppInitReducer(state, action);
  }
}
