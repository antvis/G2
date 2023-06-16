import { G2Spec } from '../../../src';

export function unemploymentAreaStacked(): G2Spec {
  return {
    width: 800,
    type: 'area',
    padding: 'auto',
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
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}

unemploymentAreaStacked.maxError = 180;
