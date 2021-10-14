import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { FrndsAppService } from '../../services/frnds_app.service';


@Injectable()
export class ClearSelectionEffects {
  constructor(
    private readonly actions$: Actions,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _frndsAppService: FrndsAppService
  ) {}


}
