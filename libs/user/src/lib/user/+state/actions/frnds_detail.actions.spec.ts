import { HttpErrorResponse } from '@angular/common/http';

import * as fromFrndsAppDetail from './frnds_detail.actions';

describe('Frnds App Init', () => {
  it('should return a user entity detail initialization action', () => {
    expect(fromFrndsAppDetail.loadSelectedUser({ id: '112' }).type).toBe('[FRNDS APP DETAILS] FRNDS DETAILS INIT');
  });

  it('should create a user entity action', () => {
    expect(fromFrndsAppDetail.addNewUser({
      user: { id: '1', name: 'abc', age: '1', weight: '2', friends: [] }
    }).type).toBe('[FRNDS APP DETAILS] FRNDS DETAILS CREATE');
  });

  it('should update a user entity action', () => {
    expect(fromFrndsAppDetail.updateExistingUser({
      user: {id: '1', changes: {name: 'abcd', age: '11'}}
    }).type).toBe('[FRNDS APP DETAILS] FRNDS DETAILS UPDATE');
  });

  it('should delete a user entity action', () => {
    expect(fromFrndsAppDetail.deleteExistingUser({
      id: '1'
    }).type).toBe('[FRNDS APP DETAILS] FRNDS DETAILS DELETE');
  });

  it('should clear a user entity action', () => {
    expect(fromFrndsAppDetail.clearUserSelection().type).toBe('[FRNDS APP DETAILS] FRNDS DETAILS CLEAR');
  });

  it('should return a user entity CRUD API success action', () => {
    expect(fromFrndsAppDetail.userEntitySuccessAction({ users: [] }).type).toBe('[FRNDS APP DETAILS] FRNDS DETAILS SUCCESS');
  });

  it('should return a user entity CRUD API failure action', () => {
    expect(fromFrndsAppDetail.userEntityFailureAction(new HttpErrorResponse({ error: '' })).type).toBe('[FRNDS APP DETAILS] FRNDS DETAILS ERROR');
  });
});
