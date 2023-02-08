import { CustomEvent } from '@antv/g';
import { G2Spec, ELEMENT_CLASS_NAME, PLOT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function alphabetIntervalHighlightBackground(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
    },
    transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
    scale: {
      x: { padding: 0.5 },
      y: { nice: true },
    },
    interaction: {
      elementHighlight: { background: true },
    },
  };
}

alphabetIntervalHighlightBackground.preprocess = disableDelay;

alphabetIntervalHighlightBackground.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);
  const [e, e1] = elements;
  return [
    step(e, 'pointerover'),
    step(e, 'pointerout'),
    // Cant'call step, because e.background is generate dynamically.
    {
      changeState: async () => {
        e.background.dispatchEvent(new CustomEvent('pointerout'));
      },
    },
    step(e1, 'pointerover'),
    step(plot, 'pointerleave'),
  ];
};
