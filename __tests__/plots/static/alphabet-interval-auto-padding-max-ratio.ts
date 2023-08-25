import { G2Spec } from '../../../src';

function appendZero(count) {
  return Array.from({ length: count }, () => 0).join('');
}

export function alphabetIntervalAutoPaddingMaxRatio(): G2Spec {
  return {
    type: 'interval',
    margin: 50,
    inset: 10,
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    axis: {
      y: [
        { labelFormatter: (d) => d + appendZero(40) },
        { labelFormatter: (d) => appendZero(40) + d, position: 'right' },
      ],
      x: [
        { labelFormatter: (d) => appendZero(40) + d },
        { labelFormatter: (d) => d + appendZero(40), position: 'top' },
      ],
    },
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
