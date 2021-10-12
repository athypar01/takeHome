import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { frndsAppNewUserClickAction } from '../actions/frnds_new_user.actions';

@Injectable()
export class FrndsNewUserEffects {

  constructor(
    private readonly actions$: Actions,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  redirectAfterClick$ = createEffect(
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

}

