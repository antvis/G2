import { G2Spec } from '../../../src';

export function aaplAreaMissingData(): G2Spec {
  return {
    width: 800,
    type: 'area',
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
      connect: true,
      connectFill: 'grey',
      connectFillOpacity: 0.15,
    },
  };
}
