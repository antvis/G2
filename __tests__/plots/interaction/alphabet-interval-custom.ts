import { G2Spec, ELEMENT_CLASS_NAME, PLOT_CLASS_NAME } from '../../../src';
import { step } from './utils';

function Fill({ color }) {
  return (context) => {
    const { container } = context;
    const [plot] = container.getElementsByClassName(PLOT_CLASS_NAME);
    const fill = (e) => {
      const { target } = e;
      if (target.className !== ELEMENT_CLASS_NAME) return;
      target.style.fill = color;
    };
    plot.addEventListener('pointerover', fill);
    return () => plot.removeEventListener('pointerover', fill);
  };
}

function Mark() {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    interaction: {
      fill: { type: Fill, color: 'orange' },
    },
  };
}

export function alphabetIntervalCustom(): G2Spec {
  return { type: Mark };
}

alphabetIntervalCustom.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e] = elements;
  return [step(e, 'pointerover')];
};
