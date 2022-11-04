import type { G2Spec } from '@/spec';

export function receiptsLineSlope(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/receipts.csv',
    },
    scale: {
      x: { type: 'point', padding: 0.25 },
      y: { nice: true },
    },
    encode: {
      x: 'year',
      y: 'receipts',
      series: 'country',
      color: '#000',
    },
    labels: [
      {
        text: (d) => `${d.country} ${d.receipts}`,
        textAnchor: 'end',
        selector: 'first',
        fontSize: 10,
        dx: -3,
        transform: [{ type: 'dodgeY' }],
      },
      {
        text: (d) => `${d.receipts} ${d.country}`,
        selector: 'last',
        fontSize: 10,
        dx: 3,
        transform: [{ type: 'dodgeY' }],
      },
    ],
  };
}
