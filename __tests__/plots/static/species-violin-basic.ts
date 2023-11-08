import { G2Spec } from '../../../src';

export function speciesViolinBasic(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/species.json',
    },
    children: [
      {
        type: 'density',
        data: {
          transform: [
            {
              type: 'kde',
              field: 'y',
              groupBy: ['x', 'species'],
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
        transform: [{ type: 'dodgeX' }],
        tooltip: false,
      },
      {
        type: 'boxplot',
        encode: {
          x: 'x',
          y: 'y',
          series: 'species',
          color: 'species',
          size: 8,
          shape: 'violin',
        },
        style: {
          opacity: 0.5,
          point: false,
        },
      },
    ],
  };
}
