import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { FrndsAppDetailActionTypes, FrndsAppEditUserActionTypes, FrndsAppSelectUserActionTypes } from '../../types/actions/friends-app-action.types';
import { Update, User } from '../../types/frnds-app-state.interface';

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

export const frndsAppSelectUserCreateActionFailure = createAction(
  FrndsAppSelectUserActionTypes.FRNDS_SELECT_USER_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const frndsAppSelectUserCreateActionSuccess = createAction(
  FrndsAppSelectUserActionTypes.FRNDS_SELECT_USER_SUCCESS,
  props<{ user: User | null}>()
);

export const frndsAppUpdateUserEditAction = createAction(
  FrndsAppEditUserActionTypes.FRNDS_EDIT_USER_INIT,
  props<{ id: string, user: User }>()
);

export const frndsAppUpdateUserSuccessAction = createAction(
  FrndsAppEditUserActionTypes.FRNDS_EDIT_USER_SUCCESS,
  props<{ user: User | null}>()
);

export const frndsAppUpdateUserFailureAction = createAction(
  FrndsAppEditUserActionTypes.FRNDS_EDIT_USER_ERROR,
  props<{ error: HttpErrorResponse }>()
);
