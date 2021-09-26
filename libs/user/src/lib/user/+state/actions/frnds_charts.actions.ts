import { createAction, props } from '@ngrx/store';

import { ChartActionTypes } from '../../types/actions/chart-action.types';

export const loadCharts = createAction(
  ChartActionTypes.CHARTS_INIT
);

export const loadChartsSuccess = createAction(
  ChartActionTypes.CHARTS_LOAD_SUCCESS,
  props<{ data: any }>()
);

export const loadChartsFailure = createAction(
  ChartActionTypes.CHARTS_LOAD_FAILURE,
  props<{ error: any }>()
);

export function loadChartsFnFailure() {
  throw new Error('Function not implemented.');
}
