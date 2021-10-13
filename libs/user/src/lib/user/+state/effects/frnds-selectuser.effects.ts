import { addNewUserFailureAction } from './../actions/frnds_new_user.actions';
import { frndsAppSelectUserActionFailure, frndsAppSelectUserActionSuccess, frndsAppUpdateUserEditAction, frndsAppUpdateUserFailureAction, frndsAppUpdateUserInitAction, frndsAppUpdateUserSuccessAction, UserActionTypes } from './../actions/frnds_select_user.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap, mergeMap } from 'rxjs/operators';

import { FrndsAppService } from '../../services/frnds_app.service';
import { User } from '../../types/frnds-app-state.interface';
import { frndsAppSelectUserClickAction } from '../actions/frnds_select_user.actions';
import { addNewUser, addNewUserSuccessAction } from '../actions/frnds_new_user.actions';
import { deleteExistingUser, deleteExistingUserFailureAction, deleteExistingUserSuccessAction } from '../actions/frnds_detail.actions';

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
            return frndsAppSelectUserActionSuccess({ user })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              frndsAppSelectUserActionFailure({ error: errorResponse })
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
          this._router.navigate(['../', 'frnds-app', query.query], { relativeTo: this._activatedRoute })
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

  editExistingUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.UPDATE_USER),
      mergeMap(({ id, user }) => {
        return this._frndsAppService.updateContact(id, user).pipe(
          map((user: User ) => {
            return frndsAppUpdateUserSuccessAction({ user })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              frndsAppUpdateUserFailureAction({ error: errorResponse })
            )
          })
        )
      })
    )
  })

  deleteExistingUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.DELETE_USER),
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

