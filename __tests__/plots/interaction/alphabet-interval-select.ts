import {
  G2Spec,
  ELEMENT_CLASS_NAME,
  MAIN_LAYER_CLASS_NAME,
} from '../../../src';
import { step } from './utils';

export function alphabetIntervalSelect(): G2Spec {
  return {
    type: 'interval',
    padding: 0,
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    axis: false,
    legend: false,
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    state: {
      selected: { fill: 'red' },
      unselected: { opacity: 0.6 },
    },
    interaction: {
      elementSelect: true,
    },
  };
}

alphabetIntervalSelect.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [mainLayer] = document.getElementsByClassName(MAIN_LAYER_CLASS_NAME);
  const [e, e1] = elements;
  return [
    step(e, 'click'),
    step(e1, 'click'),
    step(e1, 'click'),
    step(e, 'click'),
    step(e, 'click'),
    step(mainLayer, 'click'), // Reset the canvas.
  ];
};
