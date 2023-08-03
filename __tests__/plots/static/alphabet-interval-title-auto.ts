import { G2Spec } from '../../../src';

export function alphabetIntervalTitleAuto(): G2Spec {
  return {
    type: 'interval',
    title: {
      title: 'Use frequency of keyboard keys',
      subtitle: 'The mostest frequency letter are E, T, A.',
      titleFontSize: 30,
      subtitleFontSize: 20,
    },
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
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
