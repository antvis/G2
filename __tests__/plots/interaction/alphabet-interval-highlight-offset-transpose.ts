import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function alphabetIntervalHighlightOffsetTranspose(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    coordinates: [{ type: 'transpose' }],
    encode: {
      x: 'letter',
      y: 'frequency',
    },
    transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
    scale: {
      y: { nice: true },
    },
    interaction: {
      elementHighlight: { offset: 10 },
    },
  };
}

alphabetIntervalHighlightOffsetTranspose.preprocess = disableDelay;

alphabetIntervalHighlightOffsetTranspose.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e] = elements;
  return [step(e, 'pointerover')];
};
