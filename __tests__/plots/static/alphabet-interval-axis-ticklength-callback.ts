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
        tickLength: (datum, index, array) => {
          // Ensure datum is string type, set tick length based on letter position
          const letter = String(datum);
          const position = letter.charCodeAt(0) - 65; // A=0, B=1, etc.
          return position < 10 ? 10 : 20; // Short ticks for first 10 letters, long ticks for the rest
        },

        labelFontSize: 12,
        tickStroke: 'blue',
        tickLineWidth: 1,
      },
    },
  };
}
