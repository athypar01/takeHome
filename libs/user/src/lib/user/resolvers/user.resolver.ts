import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FrndsAppService } from '../services/frnds_app.service';
import { User } from '../types/frnds-app-state.interface';

@Injectable({
  providedIn: 'root',
})

export class UserByIdResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
    private _frndsAppService: FrndsAppService,
    private _router: Router
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User | null> {

    return this._frndsAppService.getUserById(route.paramMap.get('id')).pipe(

      // Error here means the requested contact is not available
      catchError((error) => {
        // Log the error
        console.error(error);

        // Get the parent url
        const parentUrl = state.url.split('/').slice(0, -1).join('/');

        // Navigate to there
        this._router.navigateByUrl(parentUrl);

        // Throw an error
        return throwError(error);
      })
    );
  }
}
