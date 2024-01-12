import { format } from 'fecha';
import { G2Spec } from '../../../src';

export function aaplLineSliderValues(): G2Spec {
  return {
    type: 'line',
    paddingLeft: 80,
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    encode: {
      x: (d) => new Date(d.date),
      y: 'close',
    },
    axis: {
      x: { title: false },
      y: { title: false },
    },
    slider: {
      x: {
        values: [0.1, 0.5],
        labelFormatter: (d) => format(d, 'YYYY/M/D'),
      },
      y: {
        values: [0.2, 0.8],
        labelFormatter: '~s',
      },
    },
  };
}
