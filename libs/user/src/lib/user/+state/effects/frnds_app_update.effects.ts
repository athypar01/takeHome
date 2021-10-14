import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FrndsAppService } from '../../services/frnds_app.service';
import { User } from '../../types/frnds_app_state.interface';
import { UserActionTypes } from '../actions/frnds_app_entity.actions';
import { editExistingUserFailureAction, editExistingUserSuccessAction } from '../actions/frnds_app_http.actions';


@Injectable()
export class UpdateExistingUsersEffects {
  constructor(
    private readonly actions$: Actions,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _frndsAppService: FrndsAppService
  ) {}

  editExistingUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.UPDATE_USER),
      mergeMap(({ id, user }) => {
        return this._frndsAppService.updateContact(id, user).pipe(
          map((user: User ) => {
            return editExistingUserSuccessAction({ user })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              editExistingUserFailureAction({ error: errorResponse })
            )
          })
        )
      })
    )
  })

}
