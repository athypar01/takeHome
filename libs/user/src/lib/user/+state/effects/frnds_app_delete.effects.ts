import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';

import { FrndsAppService } from '../../services/frnds_app.service';
import { User } from '../../types/frnds_app_state.interface';
import { deleteExistingUser, deleteExistingUserSuccessAction, deleteExistingUserFailureAction } from '../actions/frnds_app_http.actions';

@Injectable()
export class DeleteUserEffects {
  constructor(
    private readonly actions$: Actions,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _frndsAppService: FrndsAppService
  ) { }

  deleteExistingUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteExistingUser),
      mergeMap(({ id }) => {
        return this._frndsAppService.deleteContact(id).pipe(
          map((users: User[]) => {
            return deleteExistingUserSuccessAction({ users })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteExistingUserFailureAction({ error: errorResponse })
            )
          })
        )
      })
    )
  })

  redirectAfterDeletion$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteExistingUserSuccessAction),
        tap(() => {
          this._router.navigate(['../'], { relativeTo: this._activatedRoute });
        })
      )
    },
    { dispatch: false }
  )
}


