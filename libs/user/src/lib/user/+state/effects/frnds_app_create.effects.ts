import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';

import { FrndsAppService } from '../../services/frnds_app.service';
import { User } from '../../types/frnds_app_state.interface';
import { addNewUser, addNewUserSuccessAction, addNewUserFailureAction, addNewUserTrigger } from '../actions/frnds_app_http.actions';


@Injectable()
export class CreateUserEffects {
  constructor(
    private readonly actions$: Actions,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _frndsAppService: FrndsAppService
  ) {}


  redirectNewUserTrigger$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addNewUserTrigger),
        tap(() => {
          this._router.navigate(['../', 'frnds-app', 'new'], {relativeTo:this._activatedRoute})
        })
      )
    },
    { dispatch: false }
  )

  addNewUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addNewUser),
      mergeMap(({ user }) => {
        return this._frndsAppService.createUser(user).pipe(
          map((users: User[]) => {
            return addNewUserSuccessAction({ users })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addNewUserFailureAction({ error: errorResponse })
            )
          })
        )
      })
    )
  })
}
