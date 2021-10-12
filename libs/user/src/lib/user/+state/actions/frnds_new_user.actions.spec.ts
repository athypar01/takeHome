import { HttpErrorResponse } from '@angular/common/http';
import * as fromFrndsAppNewUser from './frnds_new_user.actions';

describe('Frnds App Query', () => {
  it('should return an initiate query action', () => {
    expect(fromFrndsAppNewUser.frndsAppNewUserClickAction().type).toBe('[FRNDS APP NEW_USER] FRNDS NEW_USER_CLICK');
  });
  it('should return an initiate query action', () => {
    expect(fromFrndsAppNewUser.frndsAppNewUserClickAction().type).toBe('[FRNDS APP NEW_USER] FRNDS NEW_USER_CLICK');
  });
  it('should return a query success action', () => {
    expect(fromFrndsAppNewUser.frndsAppNewUserCreateActionSuccess({users: [] }).type).toBe('[FRNDS APP QUERY] FRNDS QUERY SUCCESS');
  });
  it('should return a query failure action', () => {
    expect(fromFrndsAppNewUser.frndsAppNewUserCreateActionFailure(new HttpErrorResponse({error: ''})).type).toBe('[FRNDS APP QUERY] FRNDS QUERY ERROR');
  });
});
