import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { FrndsAppQueryActionTypes } from '../../types/friends-app-action.types';
import { User } from '../../types/frnds-app-state.interface';

export const frndsAppQueryAction = createAction(
  FrndsAppQueryActionTypes.FRNDS_QUERY,
  props<{query: string}>()
);

export const frndsAppQueryActionSuccess = createAction(
  FrndsAppQueryActionTypes.FRNDS_QUERY_SUCCESS,
  props<{ users: User[] }>()
);

export const frndsAppQueryActionFailure = createAction(
  FrndsAppQueryActionTypes.FRNDS_QUERY_ERROR,
  props<{ error: HttpErrorResponse }>()
);
