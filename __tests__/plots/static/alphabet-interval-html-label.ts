import { G2Spec } from '../../../src';

export function alphabetIntervalHtmlLabel(): G2Spec {
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
    labels: [
      {
        text: 'frequency',
        className: 'alphabet-labels',
        render: (
          _,
          datum,
        ) => `<div style="left:-50%;top:-16px;position:relative;font-size:12px;">
          <span style="color: blue">${
            datum.letter
          }</span>:<span style="color: black">${datum.frequency.toFixed(
          2,
        )}</span>
        </div>`,
      },
    ],
  };
}
