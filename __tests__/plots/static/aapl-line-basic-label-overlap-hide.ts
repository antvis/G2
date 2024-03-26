import { G2Spec } from '../../../src';

export function aaplLineBasicLabelOverlapHide(): G2Spec {
  return {
    type: 'line',
    marginRight: 30,
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    encode: {
      x: 'date',
      y: 'close',
    },
    labels: [
      {
        text: 'close',
        opacity: 1,
        fillOpacity: 1,
        transform: [
          {
            type: 'overlapHide',
          },
        ],
      },
    ],
    // animate: false,
  };
}
