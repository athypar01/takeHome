import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { FrndsAppDetailActionTypes } from '../../types/friends-app-action.types';
import { User } from '../../types/frnds-app-state.interface';

export const deleteExistingUser = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_DELETE,
  props<{ id: string }>()
);

export const deleteExistingUserSuccessAction = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_DELETE_SUCCESS,
  props<{ users: User[] }>()
);

export const deleteExistingUserFailureAction = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_DELETE_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

export const clearUserSelection = createAction(
  FrndsAppDetailActionTypes.FRNDS_DETAILS_CLEAR
);

