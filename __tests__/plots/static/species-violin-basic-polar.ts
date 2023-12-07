import { G2Spec } from '../../../src';

export function speciesViolinBasicPolar(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/species.json',
    },
    coordinate: {
      type: 'polar',
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
