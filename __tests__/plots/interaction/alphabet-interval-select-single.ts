import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export function alphabetIntervalSelectSingle(): G2Spec {
  return {
    type: 'interval',
    padding: 0,
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
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
    interactions: [
      {
        type: 'elementSelect',
        selectedFill: 'red',
        unselectedOpacity: 0.6,
        single: true,
      },
    ],
  };
}

alphabetIntervalSelectSingle.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e, e1] = elements;
  return [step(e, 'click'), step(e1, 'click'), step(e1, 'click')];
};
