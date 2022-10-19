import { G2Spec } from '../../../src';

export function penguinsPointMatrix(): G2Spec {
  return {
    type: 'matrix',
    width: 800,
    height: 800,
    paddingLeft: 60,
    paddingBottom: 60,
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    encode: {
      position: [
        'culmen_length_mm',
        'culmen_depth_mm',
        'flipper_length_mm',
        'body_mass_g',
      ],
    },
    children: [
      {
        type: 'point',
        encode: {
          color: 'species',
        },
      },
    ],
  };
}
