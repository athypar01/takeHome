import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { FrndsAppService } from '../../services/frnds_app.service';
import { User } from '../../types/frnds_app_state.interface';
import { getUserByQuery, getUserByQueryFailure, getUserByQuerySuccess } from '../actions/frnds_app_http.actions';

@Injectable()
export class GetUsersByQueryEffects {

  constructor(
    private readonly actions$: Actions,
    private _frndsAppService: FrndsAppService
  ) { }

  query$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserByQuery),
      switchMap(({ query }) => {
        return this._frndsAppService.searchUsers(query).pipe(
          map((users: User[]) => {
            return getUserByQuerySuccess({ users })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getUserByQueryFailure({ error: errorResponse })
            )
          })
        )
      })
    )
  })
}
