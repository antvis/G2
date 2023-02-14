import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export function waffleCellHighlightBackground(): G2Spec {
  return {
    type: 'cell',
    height: 640,
    data: {
      type: 'fetch',
      value: 'data/waffle.json',
    },
    encode: {
      x: 'x',
      y: 'y',
      color: (d) => `${d.index}`,
    },
    style: {
      inset: 5,
      stroke: '#000',
    },
    state: {
      active: {
        backgroundFill: 'red',
      },
    },
    interaction: {
      elementHighlight: {
        background: true,
      },
    },
  };
}

waffleCellHighlightBackground.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  return [step(elements[15], 'pointerover')];
};
