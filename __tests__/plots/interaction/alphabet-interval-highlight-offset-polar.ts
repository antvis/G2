import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function alphabetIntervalHighlightOffsetPolar(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    coordinate: { type: 'polar' },
    encode: {
      x: 'letter',
      y: 'frequency',
    },
    transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
    scale: {
      y: { nice: true },
    },
    axis: { y: false },
    state: {
      active: { offset: 10 },
    },
    interaction: {
      elementHighlight: true,
    },
  };
}

alphabetIntervalHighlightOffsetPolar.preprocess = disableDelay;

alphabetIntervalHighlightOffsetPolar.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  return elements.map((e) => step(e, 'pointerover'));
};
