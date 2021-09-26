import * as fromCharts from './frnds_charts.actions';
import { loadChartsFnFailure } from './frnds_charts.actions';

describe('Charts', () => {
  it('should return a load action', () => {
    expect(fromCharts.loadCharts().type).toBe('[FRNDS APP CHARTS] FRNDS CHARTS INIT');
  });

  it('should return a success action', () => {
    expect(fromCharts.loadChartsSuccess({ data: {}}).type).toBe('[FRNDS APP CHARTS] FRNDS CHARTS SUCCESS');
  });

  it('should return a failure action', () => {
    expect(fromCharts.loadChartsFailure({ error: {}}).type).toBe('[FRNDS APP CHARTS] FRNDS CHARTS FAILURE');
  });

  it('should return function not implemented', () => {
    expect(() => new loadChartsFnFailure()).toThrowError();
  });
});
