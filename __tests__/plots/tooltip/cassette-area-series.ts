import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export async function cassetteAreaSeries(): Promise<G2Spec> {
  return {
    type: 'view',
    width: 800,
    height: 720,
    data: { type: 'fetch', value: 'data/cassette.json' },
    encode: {
      x: (d) => new Date(d.year),
      y: 'revenue',
      series: 'format',
      shape: 'smooth',
    },
    transform: [{ type: 'stackY', orderBy: 'maxIndex', reverse: true }],
    axis: { y: { labelFormatter: '~s' } },
    interaction: {
      tooltip: { filter: (d) => parseInt(d.value as string) > 0 },
    },
    children: [
      {
        type: 'area',
        encode: { color: 'group' },
        tooltip: {
          title: (d) => new Date(d.year).toUTCString(),
          items: [
            {
              channel: 'y',
              valueFormatter: '~s',
              name: 'revenue',
            },
          ],
        },
      },
      { type: 'line', style: { stroke: 'white' }, tooltip: false },
    ],
  };
}

cassetteAreaSeries.steps = seriesTooltipSteps([100, 300]);
