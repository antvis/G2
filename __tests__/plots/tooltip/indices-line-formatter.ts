import { csv } from '@antv/vendor/d3-fetch';
import { autoType } from '@antv/vendor/d3-dsv';
import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export async function indicesLineFormatter(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  return {
    type: 'line',
    data,
    legend: false,
    encode: {
      x: (d) => d.Date.getFullYear(),
      y: 'Close',
      color: 'Symbol',
    },
    transform: [{ type: 'groupX', y: 'mean' }],
    tooltip: {
      channel: 'y',
      valueFormatter: '~s',
    },
  };
}

indicesLineFormatter.steps = seriesTooltipSteps([200, 300]);
