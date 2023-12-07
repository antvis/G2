import { G2Spec } from '../../../src';

export function aaplLineZIndex(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: 'line',
        data: {
          type: 'fetch',
          value: 'data/aapl.csv',
        },
        encode: {
          x: 'date',
          y: 'close',
        },
      },
      {
        type: 'lineY',
        data: [400],
        zIndex: -1,
        style: {
          lineWidth: 4,
          strokeOpacity: 1,
          stroke: 'red',
        },
      },
    ],
  };
}
