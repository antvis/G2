import { G2Spec } from '../../../src';

export function aaplAreaMissingData(): G2Spec {
  return {
    width: 800,
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    children: [
      {
        type: 'area',
        data: {
          transform: [
            {
              type: 'custom',
              callback: (data) =>
                data.map((d) => ({
                  ...d,
                  close: new Date(d.date).getUTCMonth() < 3 ? 0 : d.close,
                })),
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
      },
      {
        type: 'area',
        data: {
          transform: [
            {
              type: 'custom',
              callback: (data) =>
                data
                  .map((d) => ({
                    ...d,
                    close: new Date(d.date).getUTCMonth() < 3 ? d.close : 0,
                  }))
                  .filter(
                    (d, idx, arr) =>
                      (d.close !== 0 && arr[idx + 1]?.close === 0) ||
                      (d.close !== 0 && arr[idx - 1]?.close === 0) ||
                      d.close === 0,
                  ),
            },
          ],
        },
        encode: {
          x: 'date',
          y: 'close',
          color: '#eee',
        },
        scale: {
          x: { type: 'time' },
        },
      },
    ],
  };
}

aaplAreaMissingData.maxError = 125;
