import { frndsAppSelectUserCreateActionFailure } from './../actions/frnds_select_user.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import { FrndsAppService } from '../../services/frnds_app.service';
import { User } from '../../types/frnds-app-state.interface';
import { frndsAppSelectUserClickAction, frndsAppSelectUserCreateActionSuccess } from '../actions/frnds_select_user.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class FrndsAppSelectUserEffects {

  constructor(
    private readonly actions$: Actions,
    private _router: Router,
    private _frndsAppService: FrndsAppService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  selectUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(frndsAppSelectUserClickAction),
      switchMap(({ query }) => {
        return this._frndsAppService.getUserById(query).pipe(
          map((user: User | null) => {
            return frndsAppSelectUserCreateActionSuccess({ user })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              frndsAppSelectUserCreateActionFailure({ error: errorResponse })
            )
          })
        )
      })
    )
  })

  redirectAfterSelection$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(frndsAppSelectUserClickAction),
        tap((query) => {
          this._router.navigate(['../', 'frnds-app', query.query], {relativeTo:this._activatedRoute})
        })
      )
    },
    { dispatch: false }
  )
}
