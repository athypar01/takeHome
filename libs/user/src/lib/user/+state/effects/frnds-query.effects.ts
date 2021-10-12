import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { FrndsAppService } from '../../services/frnds_app.service';
import { User } from '../../types/frnds-app-state.interface';
import { frndsAppQueryAction, frndsAppQueryActionFailure, frndsAppQueryActionSuccess } from '../actions/frnds-query.actions';

@Injectable()
export class FrndsQueryEffects {

  constructor(
    private readonly actions$: Actions,
    private _frndsAppService: FrndsAppService
  ) { }

  query$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(frndsAppQueryAction),
      switchMap(({ query }) => {
        return this._frndsAppService.searchUsers(query).pipe(
          map((users: User[]) => {
            return frndsAppQueryActionSuccess({ users })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              frndsAppQueryActionFailure({ error: errorResponse })
            )
          })
        )
      })
    )
  })
}
