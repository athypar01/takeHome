import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import { FrndsAppService } from '../../services/frnds_app.service';
import { User } from '../../types/frnds_app_state.interface';
import { getUserByQuery, getUserById, getUserByIdSuccess, getUserByIdFailure } from '../actions/frnds_app_http.actions';


@Injectable()
export class GetUserByIdEffects {

  constructor(
    private readonly actions$: Actions,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _frndsAppService: FrndsAppService
  ) {}

  selectUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserById),
      switchMap(({id}) => {
        return this._frndsAppService.getUserById(id).pipe(
          map((user: User) => {
            return getUserByIdSuccess({ user })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getUserByIdFailure({ error: errorResponse })
            )
          })
        )
      })
    )
  })

  redirectAfterSelection$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(getUserById),
        tap((action) => {
          this._router.navigate(['../', 'frnds-app', action.id], { relativeTo: this._activatedRoute })
        })
      )
    },
    { dispatch: false }
  )

}
