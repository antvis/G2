import { G2Spec } from '../../../src';

export function aaplAreaMissingDataTranspose(): G2Spec {
  return {
    width: 800,
    type: 'area',
    coordinates: [{ type: 'transpose' }],
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
      transform: [
        {
          type: 'map',
          callback: (d) => ({
            ...d,
            close: d.date.getUTCMonth() <= 3 ? NaN : d.close,
          }),
        },
      ],
    },
    encode: {
      x: 'date',
      y: 'close',
    },
    scale: {
      x: { type: 'time' },
    },
    style: {
      connectNulls: true,
      connectFill: 'grey',
      connectFillOpacity: 0.15,
    },
  };
}

aaplAreaMissingDataTranspose.maxError = 125;
