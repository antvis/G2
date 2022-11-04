import type { G2Spec } from '@/spec';

export function anscombePointFacetRectRow(): G2Spec {
  return {
    type: 'facetRect',
    width: 928,
    height: 270,
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
