import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export function alphabetIntervalActiveUnselected(): G2Spec {
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
    interaction: [
      {
        type: 'elementActive',
        selectedFill: (d) => (d.frequency > 0.05 ? 'red' : 'yellow'),
        unselectedOpacity: 0.6,
      },
    ],
  };
}

alphabetIntervalActiveUnselected.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e1, e2] = elements;
  return [
    step(e1, 'pointerover'),
    step(e1, 'pointerout', true),
    step(e2, 'pointerover'),
  ];
};
