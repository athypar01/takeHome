import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { User } from './../../types/frnds-app-state.interface';
import { FrndsAppInitActionTypes, FrndsAppNewUserActionTypes } from '../../types/actions/friends-app-action.types';

export const frndsAppInitAction = createAction(
  FrndsAppInitActionTypes.FRNDS_INIT
);

export const frndsAppInitSuccessAction = createAction(
  FrndsAppInitActionTypes.FRNDS_INIT_SUCCESS,
  props<{ users: User[] }>()
);

export const frndsAppInitFailureAction = createAction(
  FrndsAppInitActionTypes.FRNDS_INIT_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const frndsAppNewUserAction = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_CLICK
);

export const frndsAppNewUserInitAction = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_INIT
);

export const frndsAppNewUserSuccessAction = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_SUCCESS,
  props<{ users: User[] }>()
);

export const frndsAppNewUserFailureAction = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_ERROR,
  props<{ error: HttpErrorResponse }>()
);
