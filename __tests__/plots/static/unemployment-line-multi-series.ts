import { G2Spec } from '../../../src';

//@todo Support mix-blend-mode
export function unemploymentLineMultiSeries(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/unemployment.csv',
    },
    encode: {
      x: 'date',
      y: 'unemployment',
      series: 'division',
      color: 'steelblue',
    },
  };
}
