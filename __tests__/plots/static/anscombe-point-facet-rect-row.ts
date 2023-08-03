import { G2Spec } from '../../../src';

export function anscombePointFacetRectRow(): G2Spec {
  return {
    type: 'facetRect',
    width: 928,
    height: 300,
    paddingLeft: 45,
    paddingBottom: 50,
    data: {
      type: 'fetch',
      value: 'data/anscombe.csv',
    },
    encode: {
      x: 'series',
    },
    children: [
      {
        type: 'point',
        inset: 10,
        encode: {
          x: 'x',
          y: 'y',
        },
        style: {
          stroke: '#000',
        },
      },
    ],
  };
}
