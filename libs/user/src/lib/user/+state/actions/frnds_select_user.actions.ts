import { HttpErrorResponse } from '@angular/common/http';
import { Action, createAction, props } from '@ngrx/store';

import { FrndsAppDetailActionTypes, FrndsAppEditUserActionTypes, FrndsAppSelectUserActionTypes } from '../../types/friends-app-action.types';
import { Update, User } from '../../types/frnds-app-state.interface';

export enum UserActionTypes {
  LOAD_USERS = '[User] Load Users',
  ADD_USER = '[User] Add User',
  UPSERT_USER = '[User] Upsert User',
  ADD_USERS = '[User] Add Users',
  UPSERT_USERS = '[User] Upsert Users',
  UPDATE_USER = '[User] Update User',
  UPDATE_USERS = '[User] Update Users',
  DELETE_USER = '[User] Delete User',
  DELETE_USERS = '[User] Delete Users',
  CLEAR_USERS = '[User] Clear Users',
}

export const frndsAppSelectUserClickAction = createAction(
  FrndsAppSelectUserActionTypes.FRNDS_SELECT_USER_CLICK,
  props<{query: string}>()
);

export const loadSelectedUser = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_INIT,
  props<{ id: string }>()
);

export const loadSelectedUserSuccessAction = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_INIT_SUCCESS,
  props<{ user: User }>()
);

export const loadSelectedUserFailureAction = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_INIT_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const frndsAppSelectUserActionFailure = createAction(
  FrndsAppSelectUserActionTypes.FRNDS_SELECT_USER_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const frndsAppSelectUserActionSuccess = createAction(
  FrndsAppSelectUserActionTypes.FRNDS_SELECT_USER_SUCCESS,
  props<{ user: User | null}>()
);

export const frndsAppUpdateUserInitAction = createAction(
  FrndsAppEditUserActionTypes.FRNDS_EDIT_USER_CLICK,
  props<{ id: string, user: User }>()
);

export const frndsAppUpdateUserEditAction = createAction(
  FrndsAppEditUserActionTypes.FRNDS_EDIT_USER_INIT,
  props<{ id: string, user: User }>()
);

export const frndsAppUpdateUserSuccessAction = createAction(
  FrndsAppEditUserActionTypes.FRNDS_EDIT_USER_SUCCESS,
  props<{ user: User }>()
);

export const frndsAppUpdateUserFailureAction = createAction(
  FrndsAppEditUserActionTypes.FRNDS_EDIT_USER_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export class LoadUsers implements Action{
  readonly type = UserActionTypes.LOAD_USERS;
  constructor(public payload: { users: User[] }) {}
}
export class AddUser implements Action{
  readonly type = UserActionTypes.ADD_USER;
  constructor(public payload: { user: User }) {}
}

export class UpsertUser implements Action{
  readonly type = UserActionTypes.UPSERT_USER;
  constructor(public payload: { user: User }) {}
}

export class AddUsers implements Action{
  readonly type = UserActionTypes.ADD_USERS;
  constructor(public payload: { users: User[] }) {}
}

export class UpsertUsers implements Action{
  readonly type = UserActionTypes.UPSERT_USERS;
  constructor(public payload: { users: User[] }) {}
}

export class UpdateUser implements Action{
  readonly type = UserActionTypes.UPDATE_USER;
  constructor(public payload: User) {}
}

export class UpdateUsers implements Action{
  readonly type = UserActionTypes.UPDATE_USERS;
  constructor(public payload: { users: Update<User>[] }) {}
}

export class DeleteUser implements Action{
  readonly type = UserActionTypes.DELETE_USER;
  constructor(public payload: { id: string }) {}
}

export class DeleteUsers implements Action{
  readonly type = UserActionTypes.DELETE_USERS;
  constructor(public payload: { ids: string[] }) {}
}

export class ClearUsers implements Action{
  readonly type = UserActionTypes.CLEAR_USERS;
}

export type UserActionsUnion =
  | LoadUsers
  | AddUser
  | UpsertUser
  | AddUsers
  | UpsertUsers
  | UpdateUser
  | UpdateUsers
  | DeleteUser
  | DeleteUsers
  | ClearUsers;

