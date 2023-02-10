import { G2Spec } from '../../../src';

export function populationIntervalRoseSurroundLabel(): G2Spec {
  return {
    type: 'interval',
    width: 720,
    height: 720,
    data: {
      type: 'fetch',
      value: 'data/population.csv',
    },
    coordinate: { type: 'polar', outerRadius: 0.85 },
    transform: [{ type: 'groupX', y: 'sum' }],
    scale: { y: { type: 'sqrt' } },
    encode: {
      x: 'year',
      y: 'people',
    },
    axis: false,
    labels: [
      {
        text: 'year',
        position: 'surround',
        offset: 12,
      },
    ],
  };
}
