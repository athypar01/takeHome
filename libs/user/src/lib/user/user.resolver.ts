import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from './user.types';

@Injectable({
  providedIn: 'root'
})
export class UserListResolver implements Resolve<any> {
  /**
   * Constructor
   */
   constructor(private _userService: UserService) {}

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
   ): Observable<User[]> {
     return this._userService.getUserList();
   }
}

@Injectable({
  providedIn: 'root',
})
export class UserByIdResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
    private _userService: UserService,
    private _router: Router
  ) {}

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
  ): Observable<User> {
    if (route.paramMap.get('id') !== '0') {
      return this._userService.getUserById(route.paramMap.get('id')).pipe(
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
    } else {
      return of(new User())
    }}

}
