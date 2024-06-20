import { G2Spec } from '../../../src';

export function stocksAreaGradient(): G2Spec {
  return {
    type: 'view',
    width: 300,
    height: 300,
    data: {
      type: 'fetch',
      value: 'data/stocks.csv',
      transform: [
        {
          type: 'filter',
          callback: (d) => d.symbol === 'GOOG',
        },
      ],
    },
    scale: { y: { nice: true } },
    children: [
      {
        type: 'area',
        encode: {
          x: (d) => new Date(d.date),
          y: 'price',
        },
        style: {
          fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
        },
      },
      {
        type: 'line',
        encode: {
          x: (d) => new Date(d.date),
          y: 'price',
        },
        style: {
          stroke: 'darkgreen',
          lineWidth: 2,
        },
      },
    ],
  };
}
