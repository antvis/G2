import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export async function indicesLineSeries(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  return {
    type: 'line',
    paddingLeft: 50,
    data,
    encode: {
      x: 'Date',
      y: 'Close',
      series: 'Symbol',
    },
    tooltip: { title: (d) => new Date(d.Date).toUTCString() },
  };
}

indicesLineSeries.steps = seriesTooltipSteps([100, 300]);
