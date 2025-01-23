import { csv } from '@antv/vendor/d3-fetch';
import { autoType } from '@antv/vendor/d3-dsv';
import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export async function indicesLineItems(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  return {
    type: 'view',
    width: 800,
    children: [
      {
        type: 'line',
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
        },
        tooltip: {
          title: (d) => new Date(d.Date).toUTCString(),
          items: [
            (d, i, D, V) => ({
              name: 'Close',
              value: V.y.value[i as number].toFixed(1),
            }),
          ],
        },
      },
    ],
  };
}

indicesLineItems.steps = seriesTooltipSteps([200, 300]);
