/* eslint-disable ngrx/prefix-selectors-with-select */
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FrndsAppStateInterface } from '../../types/frnds_app_state.interface';
import { FRNDS_APP_FEATURE_KEY, frndsAppAdapter } from '../reducers/frnds_app_entity.reducer';

export const frndsAppFeatureSelector = createFeatureSelector<FrndsAppStateInterface>(FRNDS_APP_FEATURE_KEY);

const { selectAll, selectEntities } = frndsAppAdapter.getSelectors();

export const getAllUsers = createSelector(
  frndsAppFeatureSelector, (state: FrndsAppStateInterface) =>
  selectAll(state)
);

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

export const isUsersLoaded = createSelector(
  frndsAppFeatureSelector, (state: FrndsAppStateInterface) => state.loaded
);

export const isLoadError = createSelector(
  frndsAppFeatureSelector, (state: FrndsAppStateInterface) => state.error
);

export const newUserInit = createSelector(
  frndsAppFeatureSelector,  (state: FrndsAppStateInterface) => state.isNew
)

export const editUserInit = createSelector(
  frndsAppFeatureSelector,  (state: FrndsAppStateInterface) => state.editToggleStatus
)

export const isEditStatus = createSelector(
  frndsAppFeatureSelector,
  (frndsAppState: FrndsAppStateInterface) => frndsAppState.editToggleStatus
);

export const getSlectedUsers = createSelector(
  frndsAppFeatureSelector, (state: FrndsAppStateInterface) => state.users
);
