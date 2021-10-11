/* eslint-disable ngrx/prefix-selectors-with-select */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FrndsAppDetailActionTypes } from '../../types/actions/friends-app-action.types';

import { FrndsAppStateInterface } from '../../types/frnds-app-state.interface';
import { frndsAppAdapter, FRNDS_APP_FEATURE_KEY } from '../reducers/frnds_app_init.reducer';

export const frndsAppFeatureSelector = createFeatureSelector<FrndsAppStateInterface>(FRNDS_APP_FEATURE_KEY);

const { selectAll, selectEntities } = frndsAppAdapter.getSelectors();

export const isUsersLoaded = createSelector(
  frndsAppFeatureSelector, (state: FrndsAppStateInterface) => state.loaded
);

export const isLoadError = createSelector(
  frndsAppFeatureSelector, (state: FrndsAppStateInterface) => state.error
);

export const getAllUsers = createSelector(
  frndsAppFeatureSelector, (state: FrndsAppStateInterface) =>
  selectAll(state)
);

export const newUserInit = createSelector(
  frndsAppFeatureSelector,  (state: FrndsAppStateInterface) => state.isNew
)

export const getUsersEntities = createSelector(
  frndsAppFeatureSelector, (state: FrndsAppStateInterface) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  frndsAppFeatureSelector,  (state: FrndsAppStateInterface) => state.selectedUserId
);

export const getSelectedUser = createSelector(
  getUsersEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);

export const isEditStatus = createSelector(
  frndsAppFeatureSelector,
  (frndsAppState: FrndsAppStateInterface) => frndsAppState.editToggleStatus
);
