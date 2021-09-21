/* eslint-disable ngrx/prefix-selectors-with-select */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FriendsAppStateInterface } from '../shared/user-state.interface';
import { USERS_FEATURE_KEY, usersAdapter } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const userFeatureSelector = createFeatureSelector<FriendsAppStateInterface>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const getUsersLoaded = createSelector(
  userFeatureSelector, (state: FriendsAppStateInterface) => state.loaded
);

export const getUsersError = createSelector(
  userFeatureSelector, (state: FriendsAppStateInterface) => state.error
);

export const getAllUsers = createSelector(
  userFeatureSelector, (state: FriendsAppStateInterface) =>
  selectAll(state)
);

export const getUsersEntities = createSelector(
  userFeatureSelector, (state: FriendsAppStateInterface) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  userFeatureSelector,
  (state: FriendsAppStateInterface) => state.selectedId
);

export const getSelected = createSelector(
  getUsersEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
