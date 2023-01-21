import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function penguinsPointHighlight(): G2Spec {
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    encode: {
      color: 'species',
      x: 'culmen_length_mm',
      y: 'culmen_depth_mm',
    },
    interactions: [
      {
        type: 'elementHighlight',
        background: true,
        backgroundTransform: 'scale(3, 3)',
        backgroundFill: 'red',
      },
    ],
  };
}

penguinsPointHighlight.preprocess = disableDelay;

penguinsPointHighlight.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e] = elements;
  return [step(e, 'pointerover')];
};
