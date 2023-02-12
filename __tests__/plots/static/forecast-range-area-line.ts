import { G2Spec } from '../../../src';

export function forecastRangeAreaLine(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/forecast-range.json',
    },
    encode: { x: (d) => new Date(d[0]) },
    children: [
      {
        type: 'area',
        encode: {
          y: [(d) => d[1], (d) => d[2]],
          shape: 'smooth',
        },
        style: {
          fillOpacity: 0.1,
          fill: 'orange',
        },
      },
      {
        type: 'line',
        encode: {
          y: (d) => d[3],
          color: '#FF6B3B',
          shape: 'smooth',
        },
      },
      {
        type: 'line',
        encode: {
          y: (d) => d[4],
          color: '#5B8FF9',
        },
        style: {
          lineWidth: 2,
        },
      },
      {
        type: 'point',
        data: [
          ['01-08', 0.417885699969663],
          ['01-23', 0.706678090635692],
          ['03-12', 6.0515889109663],
        ],
        encode: {
          x: (d) => new Date(d[0]),
          y: (d) => d[1],
          color: '#FF6B3B',
          shape: 'point',
          size: 3,
        },
        style: {
          lineWidth: 1,
          stroke: '#fff',
        },
      },
    ],
  };
}
