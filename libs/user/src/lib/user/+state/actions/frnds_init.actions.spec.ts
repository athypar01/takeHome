import { HttpErrorResponse } from '@angular/common/http';
import * as fromFrndsAppInit from './frnds_init.actions';

describe('Frnds App Init', () => {
  it('should return a initialzation action', () => {
    expect(fromFrndsAppInit.frndsAppInitAction().type).toBe('[FRNDS APP INIT] FRNDS APP INIT');
  });

  it('should return a initialzation success action', () => {
    expect(fromFrndsAppInit.frndsAppInitSuccessAction({users: [] }).type).toBe('[FRNDS APP INIT] FRNDS INIT SUCCESS');
  });

  it('should return a initialzation failure action', () => {
    expect(fromFrndsAppInit.frndsAppInitFailureAction(new HttpErrorResponse({error: ''})).type).toBe('[FRNDS APP INIT] FRNDS INIT ERROR');
  });
});
