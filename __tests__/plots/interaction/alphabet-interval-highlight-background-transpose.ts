import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function alphabetIntervalHighlightBackgroundTranspose(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    coordinate: { transform: [{ type: 'transpose' }] },
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

alphabetIntervalHighlightBackgroundTranspose.preprocess = disableDelay;

alphabetIntervalHighlightBackgroundTranspose.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e] = elements;
  return [step(e, 'pointerover')];
};
