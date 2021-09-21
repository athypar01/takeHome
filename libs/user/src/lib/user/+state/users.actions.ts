import { createAction, props } from '@ngrx/store';
import { CreateUserRequestInterface, DeleteUserRequestsInterface, GetRequestsInterface, UpdateUserRequestInterface } from '../shared/request.interface';

import { User } from '../shared/users.interface';
import { UserActionTypes } from './action.types';

export const userPageInitAction = createAction(UserActionTypes.USER_INIT);

export const getAllUsersAction = createAction(
  UserActionTypes.USER_GET_ALL,
  props<{ request: GetRequestsInterface }>()
);

export const getUserByIdAction = createAction(
  UserActionTypes.USER_GET_BY_ID,
  props<{ request: GetRequestsInterface }>()
);

export const getUserByQueryParam = createAction(
  UserActionTypes.USER_GET_BY_QUERY,
  props<{ request: GetRequestsInterface }>()
);

export const createUser = createAction(
  UserActionTypes.USER_CREATE_USER,
  props<{ request: CreateUserRequestInterface}>()
);

export const updateUser = createAction(
  UserActionTypes.USER_UPDATE_ID,
  props<{ request: UpdateUserRequestInterface}>()
);

export const deleteUser = createAction(
  UserActionTypes.USER_DELETE_ID,
  props<{ request: DeleteUserRequestsInterface}>()
);

export const loadUsersAPISuccessAction = createAction(
  UserActionTypes.USER_SUCCESS,
  props<{ users: User[] }>()
);

export const loadUsersAPIFailureAction = createAction(
  UserActionTypes.USER_ERROR,
  props<{ error: any }>()
);
