import { Action } from '@ngrx/store';
import { FriendsAppStateInterface } from '../shared/user-state.interface';

import { User } from '../shared/users.interface';
import * as UsersActions from './users.actions';
import { initialState, reducer } from './users.reducer';

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
      const action = UsersActions.loadUsersAPISuccessAction({ users });

      const result: FriendsAppStateInterface = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
