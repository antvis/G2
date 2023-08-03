import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function forecastRangeAreaLineTranspose(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/forecast-range.json',
    },
    height: 800,
    width: 540,
    coordinate: { transform: [{ type: 'transpose' }] },
    encode: { x: (d) => new Date(d[0]) },
    interaction: { tooltip: true },
    children: [
      {
        type: 'area',
        encode: {
          y: [(d) => d[1], (d) => d[2]],
          shape: 'smooth',
        },
        tooltip: { title: '' },
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
        tooltip: { title: '' },
      },
      {
        type: 'line',
        encode: {
          y: (d) => d[4],
          color: '#5B8FF9',
        },
        tooltip: { title: '' },
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
          y: (d) => d[1],
          color: 'red',
          shape: 'point',
          size: 3,
        },
        tooltip: {
          title: '',
          items: [{ channel: 'y', name: 'outlier' }],
        },
        style: {
          lineWidth: 1,
          stroke: '#fff',
        },
      },
    ],
  };
}

forecastRangeAreaLineTranspose.steps = seriesTooltipSteps([240, 300]);
