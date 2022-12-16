import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';

export async function indicesLineTooltipReverse(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  return {
    type: 'view',
    width: 800,
    paddingLeft: 60,
    children: [
      {
        type: 'line',
        data: data.reverse(),
        axis: {
          y: { labelAutoRotate: false },
        },
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

indicesLineTooltipReverse.skip = true;
