import { G2Spec } from '../../../src';

export function alphabetIntervalMinWidthTransposed(): G2Spec {
  return {
    type: 'interval',
    coordinate: { transform: [{ type: 'transpose' }] },
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    scale: {
      x: { padding: 0.9 },
    },
    style: {
      minWidth: 10,
    },
    axis: {
      y: { labelFormatter: '.0%' },
    },
  };
}
