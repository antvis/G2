import { G2Spec } from '../../../src';
import { forecastRangeData } from '../../data/forecast-range';

const processData = (data) =>
  data.map((d) => ({
    x: d[0],
    low: d[1],
    high: d[2],
    v2: d[3],
    v3: d[4],
  }));

export function forecastRangeAreaLine(): G2Spec {
  return {
    type: 'view',
    data: {
      value: forecastRangeData,
      transform: [{ type: 'custom', callback: processData }],
    },
    axis: { y: { title: false, labelFormatter: (d) => `${d}M` } },
    children: [
      {
        type: 'area',
        encode: {
          x: (d) => new Date(d.x),
          y: ['low', 'high'],
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
          x: (d) => new Date(d.x),
          y: 'v2',
          color: '#FF6B3B',
          shape: 'smooth',
        },
      },
      {
        type: 'line',
        encode: {
          x: (d) => new Date(d.x),
          y: 'v3',
          color: '#5B8FF9',
        },
        style: {
          lineWidth: 2,
        },
      },
      {
        type: 'point',
        data: [
          { x: '01-08', v3: 0.417885699969663 },
          { x: '01-23', v3: 0.706678090635692 },
          { x: '03-12', v3: 6.0515889109663 },
        ],
        encode: {
          x: (d) => new Date(d.x),
          y: 'v3',
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
