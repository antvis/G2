import { G2Spec } from '../../../src';

export function questionsIntervalDivergingStacked(): G2Spec {
  const types = [
    'Strongly disagree',
    'Disagree',
    'Neither agree nor disagree',
    'Agree',
    'Strongly agree',
  ];
  const colors = ['#c30d24', '#f3a583', '#cccccc', '#94c6da', '#1770ab'];
  return {
    type: 'interval',
    coordinate: { transform: [{ type: 'transpose' }] },
    data: {
      type: 'fetch',
      value: 'data/questions.csv',
      format: 'csv',
    },
    scale: {
      y: { nice: true },
      color: { domain: types, range: colors },
    },
    transform: [{ type: 'stackY' }],
    encode: {
      x: 'question',
      color: 'type',
      y: (d) =>
        d.type === 'Disagree' || d.type === 'Strongly disagree'
          ? -d.percentage
          : d.type === 'Neither agree nor disagree'
          ? -d.percentage / 2
          : +d.percentage,
    },
    axis: { y: { title: 'value' } },
  };
}
