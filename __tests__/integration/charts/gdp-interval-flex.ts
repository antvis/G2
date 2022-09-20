import { G2Spec } from '../../../src';

export function gdpIntervalFlex(): G2Spec {
  return {
    type: 'interval',
    width: 1000,
    paddingBottom: 100,
    data: {
      type: 'fetch',
      value: 'data/gdp.csv',
    },
    transform: [{ type: 'flexX', field: 'gdp' }],
    scale: {
      y: { formatter: '~s' },
    },
    encode: {
      x: 'country',
      y: 'value',
      color: 'country',
    },
  };
}
