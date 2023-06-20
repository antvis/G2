import { G2Spec } from '../../../src';

export function populationIntervalRoseLabel(): G2Spec {
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
        position: 'outside',
        offset: 12,
      },
    ],
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
