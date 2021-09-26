import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import { FrndsAppService } from '../../services/frnds_app.service';
import { User } from '../../types/frnds-app-state.interface';
import { frndsAppQueryAction, frndsAppQueryActionFailure, frndsAppQueryActionSuccess } from '../actions/frnds-query.actions';
import { frndsAppNewUserClickAction } from '../actions/frnds_new_user.actions';

@Injectable()
export class FrndsNewUserEffects {

  constructor(
    private readonly actions$: Actions,
    private _frndsAppService: FrndsAppService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }


  redirectAfterSubmit$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(frndsAppNewUserClickAction),
        tap(() => {
          this._router.navigate(['../', 'frnds-app', 'new'], {relativeTo:this._activatedRoute})
        })
      )
    },
    { dispatch: false }
  )

  // newUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(frndsAppQueryAction),
  //     switchMap(({ query }) => {
  //       return this._frndsAppService.searchUsers(query).pipe(
  //         map((users: User[]) => {
  //           return frndsAppQueryActionSuccess({ users })
  //         }),

  //         catchError((errorResponse: HttpErrorResponse) => {
  //           return of(
  //             frndsAppQueryActionFailure({ error: errorResponse })
  //           )
  //         })
  //       )
  //     })
  //   )
  // })
}

