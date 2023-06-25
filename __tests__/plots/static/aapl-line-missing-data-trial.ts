import { G2Spec } from '../../../src';

export function aaplLineMissingDataTrial(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
      transform: [
        { type: 'slice', end: 100 },
        {
          type: 'map',
          callback: (d) => ({
            ...d,
            close1: d.date.getDate() <= 14 ? NaN : d.close,
          }),
        },
      ],
    },
    encode: {
      x: 'date',
      y: 'close1',
      size: 'close',
    },
    style: { shape: 'trail' },
  };
}

aaplLineMissingDataTrial.maxError = 125;
