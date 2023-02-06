import { G2Spec } from '../../../src';

export function alphabetIntervalDataDrivenStyled(): G2Spec {
  return {
    type: 'interval',
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    axis: {
      y: { labelFormatter: '.0%' },
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    style: {
      stroke: (d) => (d.frequency > 0.01 ? 'red' : 'yellow'),
    },
  };
}
