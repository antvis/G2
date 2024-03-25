import { G2Spec } from '../../../src';

export function alphabetIntervalAxisOptions(): G2Spec {
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
        // Title
        title: 'Frequency',
        titleSpacing: 30,
        titleFill: 'steelblue',

        // Line
        line: true,
        arrow: true,
        lineExtension: [-30, -40],
        lineArrowOffset: 30,
        lineArrowSize: 20,
        lineLineWidth: 10,

        // Tick
        tickLength: 20,
        tickFilter: (_, i) => i % 3 !== 0,

        // Label
        labelFormatter: '.0%',

        // Grid
        gridLineDash: null,
        gridStroke: 'red',
        gridLineWidth: 5,
        gridAreaFill: '#eee',
      },
      x: {
        title: 'Letter',
        labelFormatter: (d) => d.repeat(3),
        labelFontSize: 30,
        labelSpacing: 30,
      },
    },
  };
}
