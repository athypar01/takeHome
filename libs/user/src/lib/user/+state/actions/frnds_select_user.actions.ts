import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { FrndsAppSelectUserActionTypes } from '../../types/actions/friends-app-action.types';
import { User } from '../../types/frnds-app-state.interface';

export const frndsAppSelectUserClickAction = createAction(
  FrndsAppSelectUserActionTypes.FRNDS_SELECT_USER_CLICK,
  props<{query: string}>()
);

export const frndsAppSelectUserCreateActionSuccess = createAction(
  FrndsAppSelectUserActionTypes.FRNDS_SELECT_USER_SUCCESS,
  props<{ user: User }>()
);

export const frndsAppSelectUserCreateActionFailure = createAction(
  FrndsAppSelectUserActionTypes.FRNDS_SELECT_USER_ERROR,
  props<{ error: HttpErrorResponse }>()
);

