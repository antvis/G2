import { G2Spec, ELEMENT_CLASS_NAME, PLOT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export function alphabetIntervalSelectBackground(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
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
      elementSelect: {
        selectedFill: 'red',
        unselectedOpacity: 0.6,
        background: true,
        backgroundPadding: 0.25,
        backgroundRadius: 10,
      },
    },
  };
}

alphabetIntervalSelectBackground.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
  const [e, e1] = elements;
  return [
    step(e, 'click'),
    step(e, 'click'),
    step(e, 'click'),
    step(e1, 'click'),
    step(plot, 'click'),
  ];
};
