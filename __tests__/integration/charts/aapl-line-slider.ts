import { G2Spec } from '../../../src';

export function aaplLineSlider(): G2Spec {
  return {
    type: 'line',
    paddingLeft: 80,
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
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
        formatter: (d) => new Date(d).toLocaleDateString(),
      },
      y: {
        formatter: '~s',
      },
    },
  };
}

aaplLineSlider.maxError = 100;
