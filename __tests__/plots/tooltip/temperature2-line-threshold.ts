import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { median } from 'd3-array';
import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export async function temperature2LineThreshold(): Promise<G2Spec> {
  const data = await csv('data/temperatures2.csv', autoType);
  const medianValue = median(
    data,
    (d: Record<string, any>) => d.value,
  ) as number;
  return {
    type: 'line',
    width: 1000,
    data,
    scale: {
      y: { nice: true },
      x: { utc: true },
      color: {
        type: 'threshold',
        domain: [medianValue],
        range: ['black', 'red'],
      },
    },
    legend: false,
    encode: {
      x: 'date',
      y: 'value',
      shape: 'hvh',
      color: 'value',
      series: () => undefined,
    },
    style: {
      gradient: 'y',
      lineWidth: 1.5,
      lineJoin: 'round',
    },
    tooltip: {
      title: (d) => d.date.toUTCString(),
    },
  };
}

temperature2LineThreshold.steps = seriesTooltipSteps([200, 300]);
