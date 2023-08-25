import { G2Spec } from '../../../src';

export function penguinsPointLink(): G2Spec {
  return {
    type: 'view',
    height: 180,
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    children: [
      {
        type: 'point',
        encode: {
          x: 'body_mass_g',
          y: 'species',
        },
        style: {
          stroke: '#000',
        },
      },
      {
        type: 'link',
        transform: [{ type: 'groupY', x: 'min', x1: 'max' }],
        encode: {
          x: 'body_mass_g',
          y: 'species',
        },
        style: {
          stroke: '#000',
        },
      },
      {
        type: 'point',
        transform: [{ type: 'groupY', x: 'median' }],
        encode: {
          y: 'species',
          x: 'body_mass_g',
          shape: 'line',
          size: 12,
        },
        style: {
          stroke: 'red',
        },
      },
    ],
  };
}
