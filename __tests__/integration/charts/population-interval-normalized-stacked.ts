import type { G2Spec } from '@/spec';

export function populationIntervalNormalizedStacked(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/population.csv',
      transform: [
        {
          type: 'filterBy',
          fields: [['year', (d) => d === 2000]],
        },
      ],
    },
    coordinate: [{ type: 'transpose' }],
    transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
    scale: {
      color: { type: 'ordinal', range: ['#ca8861', '#675193'] },
    },
    axis: { y: { tickFormatter: '.0%' } },
    encode: {
      x: 'age',
      y: 'people',
      color: 'sex',
    },
    labels: [{ text: 'people', position: 'inside', fill: 'white' }],
  };
}
