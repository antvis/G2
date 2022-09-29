import { G2Spec } from '../../../src';

export function gdpIntervalVarSize(): G2Spec {
  return {
    type: 'interval',
    width: 1000,
    paddingBottom: 100,
    data: {
      type: 'fetch',
      value: 'data/gdp.csv',
    },
    scale: {
      y: { formatter: '~s' },
      size: { range: [10, 60] },
      color: { guide: null },
    },
    encode: {
      x: 'country',
      y: 'value',
      color: 'country',
      size: 'gdp',
    },
  };
}
