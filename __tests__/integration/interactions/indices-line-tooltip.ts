import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';

export async function indicesLineTooltip(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  return {
    type: 'view',
    children: [
      {
        type: 'line',
        width: 800,
        paddingLeft: 50,
        data,
        axis: {
          y: { labelAutoRotate: false },
        },
        transform: [{ type: 'normalizeY', basis: 'first', groupBy: 'color' }],
        legend: false,
        encode: {
          x: 'Date',
          y: 'Close',
          color: 'Symbol',
          key: 'Symbol',
          title: (d) => new Date(d.Date).toLocaleDateString(),
        },
      },
    ],
    interactions: [{ type: 'tooltip' }],
  };
}

indicesLineTooltip.skip = true;
