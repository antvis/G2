import { G2Spec } from '../../../src';

export function mockIntervalFacetRectPolar(): G2Spec {
  return {
    type: 'facetRect',
    height: 320,
    data: [
      { type: 'A', value: 1, n: 64 },
      { type: 'A', value: 2, n: 37 },
      { type: 'A', value: 3, n: 29 },
      { type: 'B', value: 1, n: 58 },
      { type: 'B', value: 2, n: 38 },
      { type: 'B', value: 3, n: 25 },
    ],
    encode: { x: 'type' },
    children: [
      {
        type: 'interval',
        frame: false,
        coordinate: { type: 'polar' },
        encode: {
          x: 'value',
          y: 'n',
          color: 'value',
        },
        axis: { y: { label: false, title: false }, x: { title: false } },
      },
    ],
  };
}
