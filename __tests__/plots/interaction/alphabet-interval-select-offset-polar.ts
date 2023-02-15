import { G2Spec, ELEMENT_CLASS_NAME, PLOT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export function alphabetIntervalSelectOffsetPolar(): G2Spec {
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
      selected: { fill: 'red', offset: 10 },
      unselected: { opacity: 0.6 },
    },
    interaction: {
      elementSelect: true,
    },
  };
}

alphabetIntervalSelectOffsetPolar.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);
  const [e, e1] = elements;
  return [
    step(e, 'click'),
    step(e1, 'click'),
    step(plot, 'click'), // Reset the canvas.
  ];
};
