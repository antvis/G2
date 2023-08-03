import { G2Spec } from '../../../src';

export function penguinsPointRepeatMatrix(): G2Spec {
  return {
    type: 'repeatMatrix',
    width: 800,
    height: 800,
    paddingLeft: 70,
    paddingBottom: 70,
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

// @todo Remove this, it now has some performance issue.
penguinsPointRepeatMatrix.skip = true;
