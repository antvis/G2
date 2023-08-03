import { G2Spec } from '../../../src';

export function gdpIntervalFlex(): G2Spec {
  return {
    type: 'interval',
    width: 1000,
    data: {
      type: 'fetch',
      value: 'data/gdp.csv',
    },
    transform: [{ type: 'flexX', field: 'gdp' }],
    legend: { color: false },
    encode: {
      x: 'country',
      y: 'value',
      color: 'country',
    },
    axis: { x: { labelTransform: 'rotate(90)' } },
  };
}
