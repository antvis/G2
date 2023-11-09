import { G2Spec } from '../../../src';

export function aaplLineClip(): G2Spec {
  return {
    type: 'line',
    clip: true,
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    scale: {
      // Specify scale domain to simulate zoom.
      x: { domain: [new Date('2009'), new Date('2011')] },
      y: { domain: [100, 350] },
    },
    encode: {
      x: 'date',
      y: 'close',
    },
  };
}
