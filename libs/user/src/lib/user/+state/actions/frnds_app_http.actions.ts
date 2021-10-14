import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import {
  FrndsAppChartGenerateActionTypes,
  FrndsAppClearUserActionTypes,
  FrndsAppDeleteUserActionTypes,
  FrndsAppEditUserActionTypes,
  FrndsAppInitActionTypes,
  FrndsAppNewUserActionTypes,
  FrndsAppSelectAllUserActionTypes,
  FrndsAppSelectUserByIdActionTypes,
  FrndsAppSelectUserByQueryActionTypes,
} from '../../types/frnds_app_action.types';
import { SimpleDataModel, User } from '../../types/frnds_app_state.interface';

// -----------------------------------------------------------------------------------------------------
// @ Application Selection Actions
// -----------------------------------------------------------------------------------------------------

export const initFrndsApp = createAction(
  FrndsAppInitActionTypes.FRNDS_INIT
);

export const initFrndsAppSuccess = createAction(
  FrndsAppInitActionTypes.FRNDS_INIT_SUCCESS,
  props<{ users: User[] }>()
);

export const initFrndsAppFailure = createAction(
  FrndsAppInitActionTypes.FRNDS_INIT_ERROR,
  props<{ error: HttpErrorResponse }>()
);

// -----------------------------------------------------------------------------------------------------
// @ Get All User Actions
// -----------------------------------------------------------------------------------------------------

export const getAllUsers = createAction(
  FrndsAppSelectAllUserActionTypes.FRNDS_GET_ALL_INIT
);

export const getAllUsersSuccess = createAction(
  FrndsAppSelectAllUserActionTypes.FRNDS_GET_ALL_SUCCESS,
  props<{ users: User[] }>()
);

export const getAllUsersFailure = createAction(
  FrndsAppSelectAllUserActionTypes.FRNDS_GET_ALL_ERROR,
  props<{ error: HttpErrorResponse }>()
);

// -----------------------------------------------------------------------------------------------------
// @ Get User by Id Actions
// -----------------------------------------------------------------------------------------------------

export const getUserById = createAction(
  FrndsAppSelectUserByIdActionTypes.FRNDS_GET_BY_ID_INIT,
  props<{ id: string }>()
);

export const getUserByIdSuccess = createAction(
  FrndsAppSelectUserByIdActionTypes.FRNDS_GET_BY_ID_SUCCESS,
  props<{ user: User }>()
);

export const getUserByIdFailure = createAction(
  FrndsAppSelectUserByIdActionTypes.FRNDS_GET_BY_ID_ERROR,
  props<{ error: HttpErrorResponse }>()
);

// -----------------------------------------------------------------------------------------------------
// @ Get Users By Query
// -----------------------------------------------------------------------------------------------------

export const getUserByQuery = createAction(
  FrndsAppSelectUserByQueryActionTypes.FRNDS_GET_BY_QUERY_INIT,
  props<{ query: string }>()
);

export const getUserByQuerySuccess = createAction(
  FrndsAppSelectUserByQueryActionTypes.FRNDS_GET_BY_QUERY_SUCCESS,
  props<{ users: User[] }>()
);

export const getUserByQueryFailure = createAction(
  FrndsAppSelectUserByQueryActionTypes.FRNDS_GET_BY_QUERY_ERROR,
  props<{ error: HttpErrorResponse }>()
);

// -----------------------------------------------------------------------------------------------------
// @ Add New User Actions
// -----------------------------------------------------------------------------------------------------

export const addNewUserTrigger = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_CLICK,
);

export const addNewUser = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_INIT,
  props<{ user: User }>()
);

export const addNewUserSuccessAction = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_SUCCESS,
  props<{ users: User[] }>()
);

export const addNewUserFailureAction = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_ERROR,
  props<{ error: HttpErrorResponse }>()
);

// -----------------------------------------------------------------------------------------------------
// @ Updated User Actions
// -----------------------------------------------------------------------------------------------------

export const editExistingUserTrigger = createAction(
  FrndsAppEditUserActionTypes.FRNDS_EDIT_USER_CLICK,
  props<{ id: string, user: User }>()
);

export const editExistingUser = createAction(
  FrndsAppEditUserActionTypes.FRNDS_EDIT_USER_INIT,
  props<{ id: string, user: User }>()
);

export const editExistingUserSuccessAction = createAction(
  FrndsAppEditUserActionTypes.FRNDS_EDIT_USER_SUCCESS,
  props<{ user: User }>()
);

export const editExistingUserFailureAction = createAction(
  FrndsAppEditUserActionTypes.FRNDS_EDIT_USER_ERROR,
  props<{ error: HttpErrorResponse }>()
);

// -----------------------------------------------------------------------------------------------------
// @ Delete User Actions
// -----------------------------------------------------------------------------------------------------

export const deleteExistingUser = createAction(
  FrndsAppDeleteUserActionTypes.FRNDS_DELETE_USER_INIT,
  props<{ id: string }>()
);

export const deleteExistingUserSuccessAction = createAction(
  FrndsAppDeleteUserActionTypes.FRNDS_DELETE_USER_SUCCESS,
  props<{ users: User[] }>()
);

export const deleteExistingUserFailureAction = createAction(
  FrndsAppDeleteUserActionTypes.FRNDS_DELETE_USER_ERROR,
  props<{ error: HttpErrorResponse }>()
);

// -----------------------------------------------------------------------------------------------------
// @ Clear Selection Actions
// -----------------------------------------------------------------------------------------------------

export const clearUserSelection = createAction(
  FrndsAppClearUserActionTypes.FRNDS_CLEAR_USER_CLICK
);

// -----------------------------------------------------------------------------------------------------
// @ Load Chart Actions
// -----------------------------------------------------------------------------------------------------

export const loadCharts = createAction(
  FrndsAppChartGenerateActionTypes.FRNDS_CHARTS_GEN_INIT,
  props<{ data: Array<SimpleDataModel> }>()
);

export const loadChartsSuccess = createAction(
  FrndsAppChartGenerateActionTypes.FRNDS_CHARTS_GEN_SUCCESS,
  props<{ data: Array<SimpleDataModel> }>()
);

export const loadChartsFailure = createAction(
  FrndsAppChartGenerateActionTypes.FRNDS_CHARTS_GEN_FAILURE,
  props<{ error: any }>()
);
