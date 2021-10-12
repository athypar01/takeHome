import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as frndsAppInitAction from '../actions/frnds_init.actions';
import { FrndsAppInitEffects } from './frnds_init.effects';

describe('UsersEffects', () => {
  let actions: Observable<Action>;
  let effects: FrndsAppInitEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        FrndsAppInitEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(FrndsAppInitEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: frndsAppInitAction.frndsAppInitAction() });

      const expected = hot('-a-|', {
        a: frndsAppInitAction.frndsAppInitSuccessAction({ users: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
