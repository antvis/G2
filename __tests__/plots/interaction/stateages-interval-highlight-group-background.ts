import { CustomEvent } from '@antv/g';
import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function stateAgesIntervalHighlightGroupBackground(): G2Spec {
  return {
    type: 'interval',
    paddingLeft: 60,
    transform: [
      { type: 'sortX', by: 'y', reverse: true, reducer: 'sum', slice: 6 },
      { type: 'dodgeX' },
    ],
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
    },
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
    axis: { y: { labelFormatter: '~s' } },
    state: {
      active: { fill: 'red' },
      inactive: { opacity: 0.6 },
    },
    interaction: {
      elementHighlightByX: {
        background: true,
      },
    },
  };
}

stateAgesIntervalHighlightGroupBackground.preprocess = disableDelay;

stateAgesIntervalHighlightGroupBackground.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e1, ...rest] = elements;
  const [e2] = rest.filter((d) => d.__data__.x === e1.__data__.x);
  return [
    step(e1, 'pointerover'),
    {
      skip: true,
      changeState: () => {
        e1.background.dispatchEvent(new CustomEvent('pointermove'));
      },
    },
    step(e2, 'pointerover'),
  ];
};
