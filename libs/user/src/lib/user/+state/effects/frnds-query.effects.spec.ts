import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FrndsQueryEffects } from './frnds-query.effects';

describe('FrndsQueryEffects', () => {
  let actions$: Observable<any>;
  let effects: FrndsQueryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FrndsQueryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FrndsQueryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
