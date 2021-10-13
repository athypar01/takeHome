import { createAction, props } from '@ngrx/store';

import { SimpleDataModel } from './../../components/charts/data.interface';
import { ChartActionTypes } from '../../types/chart-action.types';

export const loadCharts = createAction(
  ChartActionTypes.CHARTS_INIT,
  props<{ data: Array<SimpleDataModel> }>()
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
