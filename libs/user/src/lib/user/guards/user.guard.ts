import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { DetailsComponent } from '../components/details/details.component';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanDeactivate<DetailsComponent> {
  canDeactivate(
    component: DetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Get the next route
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
      nextRoute = nextRoute.firstChild;
    }

    // If we are navigating to another contact...
    if (nextRoute.paramMap.get('id') !== null && nextRoute.paramMap.get('id') !== undefined) {
      // Just navigate
      return true;
    }
    // Otherwise...
    else {
      // Close the drawer first, and then navigate
      return component.closeDrawer().then(() => true);
    }
  }
}
