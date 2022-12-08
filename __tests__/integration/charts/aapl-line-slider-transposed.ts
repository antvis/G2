import { G2Spec } from '../../../src';

export function aaplLineSliderTransponsed(): G2Spec {
  return {
    type: 'line',
    paddingLeft: 80,
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    coordinates: [{ type: 'transpose' }],
    encode: {
      x: (d) => new Date(d.date),
      y: 'close',
    },
    axis: {
      x: { title: false, size: 28 },
      y: { title: false, size: 36 },
    },
    slider: {
      x: {
        labelFormatter: (d) => new Date(d).toLocaleDateString(),
      },
      y: {
        labelFormatter: '~s',
      },
    },
  };
}

aaplLineSliderTransponsed.maxError = 100;
