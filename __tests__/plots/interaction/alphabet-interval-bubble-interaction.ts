import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function alphabetIntervalBubbleInteraction(): G2Spec {
  return {
    type: 'view',
    interaction: {
      elementHighlight: {
        background: true,
      },
    },
    children: [
      {
        type: 'interval',
        data: {
          type: 'fetch',
          value: 'data/alphabet.csv',
        },
        encode: {
          x: 'letter',
          y: 'frequency',
        },
        interaction: {
          elementHighlight: {
            background: false,
          },
        },
      },
    ],
  };
}

alphabetIntervalBubbleInteraction.preprocess = disableDelay;

alphabetIntervalBubbleInteraction.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e] = elements;
  return [step(e, 'pointerover')];
};
