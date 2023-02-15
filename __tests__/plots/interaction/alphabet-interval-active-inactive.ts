import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { disableDelay, step } from './utils';

export function alphabetIntervalActiveInactive(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    axis: false,
    legend: false,
    padding: 0,
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    state: {
      active: {
        fill: (d) => (d.frequency > 0.05 ? 'red' : 'yellow'),
      },
      inactive: { opacity: 0.6 },
    },
    interaction: {
      elementHighlight: true,
    },
  };
}

alphabetIntervalActiveInactive.preprocess = disableDelay;

alphabetIntervalActiveInactive.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e1, e2] = elements;
  return [
    step(e1, 'pointerover'),
    step(e1, 'pointerout', { skip: true }),
    step(e2, 'pointerover'),
  ];
};
