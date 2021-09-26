import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { FrndsAppNewUserActionTypes } from '../../types/actions/friends-app-action.types';
import { User } from '../../types/frnds-app-state.interface';

export const frndsAppNewUserClickAction = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_CLICK
);

export const frndsAppNewUserCreateAction = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_INIT,
  props<{query: string}>()
);

export const frndsAppNewUserCreateActionSuccess = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_SUCCESS,
  props<{ users: User[] }>()
);

export const frndsAppNewUserCreateActionFailure = createAction(
  FrndsAppNewUserActionTypes.FRNDS_NEW_USER_ERROR,
  props<{ error: HttpErrorResponse }>()
);

