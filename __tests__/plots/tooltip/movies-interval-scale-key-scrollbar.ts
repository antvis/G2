import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export async function moviesIntervalScaleKeyScrollbar(): Promise<G2Spec> {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/movies.csv',
    },
    encode: {
      x: 'Major Genre',
      y: 'Worldwide Gross',
      series: () => 'Worldwide Gross',
      color: () => 'Worldwide Gross',
    },
    transform: [{ type: 'groupX', y: 'sum' }],
    scale: { y: { key: 'left' } },
    axis: { y: { labelFormatter: '~s' }, x: { labelTransform: 'rotate(90)' } },
    tooltip: { items: [{ channel: 'y', valueFormatter: '~s' }] },
    slider: { x: true },
  };
}

moviesIntervalScaleKeyScrollbar.steps = seriesTooltipSteps([300, 100]);
