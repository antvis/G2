import { G2Spec } from '../../../src';

export function unemploymentAreaStackedLegendVertical(): G2Spec {
  return {
    width: 800,
    type: 'area',
    data: {
      type: 'fetch',
      value: 'data/unemployment-by-industry.csv',
    },
    transform: [{ type: 'stackY' }],
    encode: {
      x: 'date',
      y: 'unemployed',
      color: 'industry',
    },
    legend: { color: { position: 'right' } },
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
