import { G2Spec } from '../../../src';

export function aapl2CandlestickChart(): G2Spec {
  return {
    type: 'view',
    width: 900,
    data: {
      type: 'fetch',
      value: 'data/aapl2.csv',
    },
    scale: {
      color: {
        domain: [1, 0, -1],
        range: ['#4daf4a', '#999999', '#e41a1c'],
      },
    },
    legend: false,
    axis: {
      y: { title: '↑ Price ($)' },
    },
    children: [
      {
        type: 'link',
        encode: {
          x: 'Date',
          y: ['Low', 'High'],
        },
        style: {
          stroke: 'black',
        },
      },
      {
        type: 'link',
        encode: {
          x: 'Date',
          y: ['Open', 'Close'],
          color: (d) => Math.sign(d.Close - d.Open),
        },
        style: {
          radius: 2,
          fillOpacity: 1,
          lineWidth: 4,
          lineCap: 'round',
        },
      },
    ],
  };
}
