import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function alphabetIntervalHighlightBackgroundPolar(): G2Spec {
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
    transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 10 }],
    scale: {
      y: { nice: true },
    },
    axis: {
      y: false,
    },
    interaction: {
      elementHighlight: { background: true },
    },
  };
}

alphabetIntervalHighlightBackgroundPolar.preprocess = disableDelay;

alphabetIntervalHighlightBackgroundPolar.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e] = elements;
  return [step(e, 'pointerover')];
};
