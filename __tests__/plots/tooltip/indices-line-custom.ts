import { csv } from '@antv/vendor/d3-fetch';
import { autoType } from '@antv/vendor/d3-dsv';
import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';
import { render } from './alphabet-interval-custom-dom';

export async function indicesLineCustom(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  return {
    type: 'view',
    width: 800,
    paddingLeft: 50,
    children: [
      {
        type: 'line',
        data,
        axis: { y: { labelAutoRotate: false } },
        transform: [{ type: 'normalizeY', basis: 'first', groupBy: 'color' }],
        legend: false,
        encode: {
          x: 'Date',
          y: 'Close',
          color: 'Symbol',
          key: 'Symbol',
        },
        tooltip: { channel: 'y' },
      },
    ],
    interaction: {
      tooltip: { render },
    },
  };
}

indicesLineCustom.steps = seriesTooltipSteps([200, 300], [300, 300]);
