import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function alphabetIntervalActive(): G2Spec {
  return {
    type: 'interval',
    padding: 0,
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    axis: false,
    legend: false,
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    state: {
      active: { fill: 'red' },
    },
    interaction: {
      elementHighlight: true,
    },
  };
}

alphabetIntervalActive.preprocess = disableDelay;

alphabetIntervalActive.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e, e1] = elements;
  return [
    step(e, 'pointerover'),
    step(e, 'pointerout'),
    step(e, 'pointerover'),
    step(e, 'pointerout'),
    step(e1, 'pointerover'),
    step(e1, 'pointerout'),
  ];
};
