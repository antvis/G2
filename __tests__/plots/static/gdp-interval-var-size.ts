import { G2Spec } from '../../../src';

export function gdpIntervalVarSize(): G2Spec {
  return {
    type: 'interval',
    width: 1000,
    data: {
      type: 'fetch',
      value: 'data/gdp.csv',
    },
    scale: {
      size: { range: [10, 60] },
    },
    legend: false,
    encode: {
      x: 'country',
      y: 'value',
      color: 'country',
      size: 'gdp',
    },
  };
}
