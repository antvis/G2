import { G2Spec } from '../../../src';

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
        selector: 'first',
        transform: [{ type: 'overlapDodgeY' }],
        fontSize: 10,
        dx: -3,
        textAlign: 'end',
      },
      {
        text: (d) => `${d.receipts} ${d.country}`,
        selector: 'last',
        transform: [{ type: 'overlapDodgeY' }],
        fontSize: 10,
        dx: 3,
      },
    ],
  };
}
