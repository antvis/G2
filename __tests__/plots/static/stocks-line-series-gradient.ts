import { G2Spec } from '../../../src';

export function stocksLineSeriesGradient(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/stocks.csv',
    },
    encode: {
      x: (d) => new Date(d.date),
      y: 'price',
      series: 'symbol',
      color: 'price',
    },
    legend: { size: false },
    style: {
      gradient: 'y',
      lineWidth: 10,
      shape: 'smooth',
    },
  };
}
