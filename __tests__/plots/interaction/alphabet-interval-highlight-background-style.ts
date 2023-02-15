import { CustomEvent } from '@antv/g';
import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function alphabetIntervalHighlightBackgroundStyle(): G2Spec {
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
    state: {
      active: {
        backgroundPadding: 0.2,
        backgroundRadius: 10,
        backgroundFill: (d) => (d.frequency > 0.12 ? 'red' : undefined),
      },
    },
    interaction: {
      elementHighlight: {
        background: true,
      },
    },
  };
}

alphabetIntervalHighlightBackgroundStyle.preprocess = disableDelay;

alphabetIntervalHighlightBackgroundStyle.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e, e1] = elements;
  return [
    step(e, 'pointerover'),
    {
      skip: true,
      changeState: async () => {
        e.background.dispatchEvent(new CustomEvent('pointerout'));
      },
    },
    step(e1, 'pointerover'),
  ];
};
