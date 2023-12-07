import { G2Spec } from '../../../src';

export function unemploymentAreaStackedDataDrivenStyled(): G2Spec {
  return {
    width: 800,
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/unemployment-by-industry.csv',
    },
    children: [
      {
        type: 'area',
        transform: [{ type: 'stackY' }],
        encode: {
          x: 'date',
          y: 'unemployed',
          color: 'industry',
        },
        style: {
          lineWidth: 1,
          stroke: ([d]) => (d.unemployed > 500 ? 'red' : 'yellow'),
        },
      },
    ],
  };
}
