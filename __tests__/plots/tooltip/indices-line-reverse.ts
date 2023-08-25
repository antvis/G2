import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export async function indicesLineReverse(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  return {
    type: 'view',
    width: 800,
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
        },
        tooltip: { title: (d) => new Date(d.Date).toUTCString() },
      },
    ],
  };
}

indicesLineReverse.steps = seriesTooltipSteps([100, 300], [500, 300]);
