import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { disableDelay, step } from './utils';

export function moviesIntervalHighlightMultipleState(): G2Spec {
  return {
    type: 'view',
    paddingBottom: 160,
    data: {
      type: 'fetch',
      value: 'data/movies.csv',
    },
    children: [
      {
        type: 'interval',
        transform: [{ type: 'groupX', y: 'sum' }],
        axis: {
          y: { labelFormatter: '~s' },
          x: { labelTransform: 'rotate(90)' },
        },
        encode: {
          x: 'Major Genre',
          y: 'Worldwide Gross',
          series: () => 'Worldwide Gross',
          color: () => 'Worldwide Gross',
        },
        state: {
          active: {
            fill: 'yellow',
          },
        },
      },
      {
        type: 'interval',
        transform: [{ type: 'groupX', y: 'sum' }],
        encode: {
          x: 'Major Genre',
          y: 'US Gross',
          color: () => 'US Gross',
          series: () => 'US Gross',
        },
        state: {
          active: {
            fill: 'red',
          },
        },
      },
    ],
    interaction: {
      elementHighlight: true,
    },
  };
}

moviesIntervalHighlightMultipleState.preprocess = disableDelay;

moviesIntervalHighlightMultipleState.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e1] = elements;
  const e2 = elements[elements.length - 1];
  return [
    step(e1, 'pointerover'),
    step(e1, 'pointerout', { skip: true }),
    step(e2, 'pointerover'),
  ];
};
