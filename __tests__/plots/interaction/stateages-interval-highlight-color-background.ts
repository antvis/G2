import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export function stateAgesIntervalHighlightColorBackground(): G2Spec {
  return {
    type: 'interval',
    transform: [
      { type: 'stackY' },
      { type: 'sortX', by: 'y', reverse: true, slice: 5 },
    ],
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
      format: 'csv',
    },
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
    scale: {
      x: { paddingInner: 0.2 },
    },
    axis: {
      y: { labelFormatter: '~s' },
    },
    state: {
      active: { fill: 'red' },
      inactive: { opacity: 0.6 },
    },
    interaction: {
      elementHighlightByColor: {
        background: true,
      },
    },
  };
}

stateAgesIntervalHighlightColorBackground.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e1] = elements;
  return [step(e1, 'pointerover')];
};
