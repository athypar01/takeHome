import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { User } from './../../types/frnds-app-state.interface';
import { FrndsAppInitActionTypes } from '../../types/friends-app-action.types';

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


