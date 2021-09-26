import { Action } from '@ngrx/store';

import { FrndsAppStateInterface, User } from '../../types/frnds-app-state.interface';
import * as frndsAppInitActions from '../actions/frnds_init.actions';
import { initialState, initReducer } from './frnds_app_init.reducer';

describe('Users Reducer', () => {
  const createUsersEntity = (id: string, name = '', age = '', weight = '', friends= []): User => ({
    id,
    name,
    age,
    weight,
    friends
  });

  describe('valid Users actions', () => {
    it('loadUsersSuccess should return the list of known Users', () => {
      const users = [
        createUsersEntity('PRODUCT-AAA'),
        createUsersEntity('PRODUCT-zzz'),
      ];
      const action = frndsAppInitActions.frndsAppInitSuccessAction({ users });
      const result: FrndsAppStateInterface = initReducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;
      const result = initReducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });
});
