import { G2Spec } from '../../../src';

export function aaplLineBasicSampleLabelFilter(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    encode: {
      x: 'date',
      y: 'close',
    },
    transform: [
      {
        type: 'sample',
        thresholds: 100,
        strategy: 'lttb',
      },
    ],
    axis: {
      x: {
        labelFormatter: (d, i) => {
          return (
            d.getFullYear().toString() + (i % 2 === 0 ? '(even)' : '(odd)')
          );
        },
      },
      y: {
        tickFilter: (d) => {
          return d % 100 === 0;
        },
      },
    },
  };
}
