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
        transform: [{ type: 'dodgeX' }],
        style: {
          fillOpacity: 0.2,
          strokeOpacity: 0.2,
        },
      },
    ],
  };
}

speciesViolinBasicPolar.maxError = 100;
