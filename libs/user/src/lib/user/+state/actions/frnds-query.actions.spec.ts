import { HttpErrorResponse } from '@angular/common/http';
import * as fromFrndsAppQuery from './frnds-query.actions';

describe('Frnds App Query', () => {
  it('should return an initiate query action', () => {
    expect(fromFrndsAppQuery.frndsAppQueryAction({query: ''}).type).toBe('[FRNDS APP QUERY] FRNDS QUERY');
  });
  it('should return a query success action', () => {
    expect(fromFrndsAppQuery.frndsAppQueryActionSuccess({users: [] }).type).toBe('[FRNDS APP QUERY] FRNDS QUERY SUCCESS');
  });
  it('should return a query failure action', () => {
    expect(fromFrndsAppQuery.frndsAppQueryActionFailure(new HttpErrorResponse({error: ''})).type).toBe('[FRNDS APP QUERY] FRNDS QUERY ERROR');
  });
});
