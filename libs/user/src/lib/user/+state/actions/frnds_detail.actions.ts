import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';

import { FrndsAppDetailActionTypes } from '../../types/actions/friends-app-action.types';
import { User } from './../../types/frnds-app-state.interface';

export const loadSelectedUser = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_INIT,
  props<{ id: string }>()
);

export const loadSelectedUserSuccessAction = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_INIT_SUCCESS,
  props<{ users: User[] }>()
);

export const loadSelectedUserFailureAction = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_INIT_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const addNewUser = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_CREATE,
  props<{ user: User }>()
);

export const addNewUserSuccessAction = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_CREATE_SUCCESS,
  props<{ users: User[] }>()
);

export const addNewUserFailureAction = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_CREATE_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

export const deleteExistingUser = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_DELETE,
  props<{ id: string }>()
);

export const deleteExistingUserSuccessAction = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_DELETE_SUCCESS,
  props<{ id: string }>()
);

export const deleteExistingUserFailureAction = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_DELETE_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

export const clearUserSelection = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_CLEAR
);

export const updateExistingUser = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_UPDATE,
  props<{ user: Update<User> }>()
);

export const updateExistingUserSuccessAction = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_UPDATE_SUCCESS,
  props<{ users: User[] }>()
);

export const updateExistingUserFailureAction = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_UPDATE_FAILURE,
  props<{ error: HttpErrorResponse }>()
);
