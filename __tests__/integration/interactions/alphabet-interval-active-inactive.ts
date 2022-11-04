import { step } from './utils';
import { ELEMENT_CLASS_NAME } from '@/runtime';
import type { G2Spec } from '@/spec';

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
    interaction: [
      {
        type: 'elementActive',
        activeFill: (d) => (d.frequency > 0.05 ? 'red' : 'yellow'),
        inactiveOpacity: 0.6,
      },
    ],
  };
}

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
