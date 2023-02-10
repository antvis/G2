import { G2Spec } from '../../../src';

export function penguinsIntervalGroupColor(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    height: 120,
    coordinate: { transform: [{ type: 'transpose' }] },
    transform: [
      { type: 'groupColor', y: 'count' },
      { type: 'stackY' },
      { type: 'normalizeY' },
    ],
    axis: { y: { labelFormatter: '.0%' } },
    encode: {
      color: 'sex',
    },
    labels: [{ text: 'sex', position: 'inside' }],
  };
}
