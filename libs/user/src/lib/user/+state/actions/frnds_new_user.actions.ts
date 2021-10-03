import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { FrndsAppDetailActionTypes, FrndsAppNewUserActionTypes } from '../../types/actions/friends-app-action.types';
import { User } from '../../types/frnds-app-state.interface';

export const frndsAppNewUserClickAction = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_CLICK
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

export const frndsAppNewUserCreateAction = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_INIT,
  props<{query: string}>()
);
