import { G2Spec } from '../../../src';

export function populationIntervalRose(): G2Spec {
  return {
    type: 'interval',
    width: 720,
    height: 720,
    data: {
      type: 'fetch',
      value: 'data/population.csv',
    },
    coordinate: { type: 'polar' },
    transform: [{ type: 'groupX', y: 'sum' }],
    scale: { y: { type: 'sqrt' } },
    axis: {
      y: {
        labelFormatter: '~s',
        tickCount: 5,
        tickFilter: (d, i) => i !== 0,
        direction: 'right',
      },
    },
    encode: {
      x: 'year',
      y: 'people',
    },
  };
}
