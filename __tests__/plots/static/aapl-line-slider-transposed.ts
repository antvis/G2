import { format } from 'fecha';
import { G2Spec } from '../../../src';

export function aaplLineSliderTransposed(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    coordinate: { transform: [{ type: 'transpose' }] },
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
        labelFormatter: (d) => format(d, 'YYYY/M/D'),
      },
      y: {
        labelFormatter: '~s',
      },
    },
  };
}
