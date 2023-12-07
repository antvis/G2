import { G2Spec } from '../../../src';

export function speciesDensityBasic(): G2Spec {
  return {
    type: 'density',
    data: {
      type: 'fetch',
      value: 'data/species.json',
      transform: [
        {
          type: 'kde',
          field: 'y',
          groupBy: ['x', 'species'],
          size: 10,
        },
      ],
    },
    encode: {
      x: 'x',
      y: 'y',
      series: 'species',
      color: 'species',
      size: 'size',
    },
    tooltip: false,
  };
}
