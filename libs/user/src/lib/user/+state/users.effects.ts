import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { userPageInitAction } from './users.actions';

@Injectable()
export class UsersEffects {
  // init$ = createEffect(() => {
  //   this.actions$.pipe(
  //     ofType(userPageInitAction),
  //     switchMap(({request}) => {
  //       return this.userSer.register(request).pipe(
  //         map((currentUser: CurrentUserInterface) => {
  //           this.persistanceService.set('accessToken', currentUser.token)
  //           return registerSuccessAction({currentUser})
  //         }),

  //         catchError((errorResponse: HttpErrorResponse) => {
  //           return of(
  //             registerFailureAction({errors: errorResponse.error.errors})
  //           )
  //         })
  //       )
  //     })
  //   )
  // });

  // constructor(
  //   private readonly actions$: Actions,
  // ) { }
}
