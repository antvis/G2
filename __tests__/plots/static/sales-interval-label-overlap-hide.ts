import { G2Spec } from '../../../src';

export function salesIntervalLabelOverlapHide(): G2Spec {
  return {
    type: 'interval',
    data: [
      { year: '1951 年', sales: 1233 },
      { year: '1952 年', sales: 53332 },
      { year: '1956 年', sales: 63331 },
      { year: '1957 年', sales: 143335 },
      { year: '1958 年', sales: 43338 },
      { year: '1959 年', sales: 33338 },
      { year: '1960 年', sales: 33338 },
      { year: '1962 年', sales: 33338 },
    ],
    encode: {
      x: 'year',
      y: 'sales',
    },
    labels: [
      {
        text: 'sales',
        transform: [{ type: 'overflowHide' }],
      },
    ],
  };
}
