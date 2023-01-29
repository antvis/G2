import { G2Spec, ELEMENT_CLASS_NAME, PLOT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export function alphabetIntervalSelectOffsetPolar(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    coordinates: [{ type: 'polar' }],
    encode: {
      x: 'letter',
      y: 'frequency',
    },
    transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
    scale: {
      y: { nice: true },
    },
    axis: { y: false },
    interactions: [
      {
        type: 'elementSelect',
        selectedFill: 'red',
        unselectedOpacity: 0.6,
        offset: 10,
      },
    ],
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
