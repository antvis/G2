import { G2Spec } from '../../../src';

export function alphabetIntervalAxisTickLengthCallback(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
    },
    axis: {
      y: {
        title: 'Frequency with Dynamic Tick Length',
        titleFill: 'steelblue',

        // Use callback function to set dynamic tickLength
        tickLength: (datum, index) => {
          // Return different tick lengths based on index
          return index % 2 === 0 ? 15 : 5;
        },

        // Label formatting
        labelFormatter: '.0%',

        // Style
        tickStroke: 'red',
        tickLineWidth: 2,
      },
      x: {
        title: 'Letter',

        // Use callback function to set different tick lengths based on data values
        tickLength: (datum) => {
          const { label } = datum;
          const position = label?.charCodeAt(0) - 'A'.charCodeAt(0); // A=0, B=1, etc.
          return position === 9 ? 20 : 10; // Long ticks for J, short ticks for the rest
        },

        labelFontSize: 12,
        tickStroke: 'blue',
        tickLineWidth: 1,
      },
    },
  };
}
