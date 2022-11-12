import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';

export async function indicesLinePointScaleKey(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  const line = (symbol) => ({
    type: 'line',
    legend: false,
    data: {
      transform: [
        {
          type: 'filterBy',
          fields: [['Symbol', (d) => d === symbol]],
        },
      ],
    },
    scale: {
      y: { key: 'line' },
    },
    axis: {
      y: { titleFill: 'steelblue' },
    },
    encode: {
      x: 'Date',
      y: 'Close',
      color: 'Symbol',
      key: 'Symbol',
    },
  });
  const normalizePoint = (symbol) => ({
    type: 'point',
    legend: false,
    data: {
      transform: [
        {
          type: 'filterBy',
          fields: [['Symbol', (d) => d === symbol]],
        },
      ],
    },
    scale: {
      y: { key: 'normalizePoint' },
    },
    axis: {
      y: {
        position: 'right',
        grid: false,
        titleFill: 'orange',
        title: 'Normalized Close',
      },
    },
    transform: [{ type: 'normalizeY', groupBy: 'color' }],
    encode: {
      x: 'Date',
      y: 'Close',
      color: 'Symbol',
      key: 'Symbol',
    },
  });
  return {
    type: 'view',
    width: 800,
    paddingLeft: 50,
    data,
    scale: {
      color: {
        domain: ['AAPL', 'AMZN', 'IBM', 'MSFT'],
        range: ['steelblue', 'steelblue', 'orange', 'orange'],
      },
    },
    children: [
      line('AAPL'),
      line('AMZN'),
      normalizePoint('IBM'),
      normalizePoint('MSFT'),
    ],
  };
}
