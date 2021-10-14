import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { FrndsAppService } from '../../services/frnds_app.service';
import { User } from '../../types/frnds_app_state.interface';
import {
  initFrndsApp,
  initFrndsAppFailure,
  initFrndsAppSuccess,
} from '../actions/frnds_app_http.actions';

@Injectable()
export class GetAllUsersEffects {
  constructor(
    private readonly actions$: Actions,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _frndsAppService: FrndsAppService
  ) {}

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initFrndsApp),
      switchMap(() => {
        return this._frndsAppService.getUserList().pipe(
          map((userList: User[]) => {
            this._router.navigate(['../'], {
              relativeTo: this._activatedRoute,
            });
            return initFrndsAppSuccess({ users: userList });
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(initFrndsAppFailure({ error: errorResponse }));
          })
        );
      })
    );
  });
}
