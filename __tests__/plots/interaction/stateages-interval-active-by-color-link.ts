import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function stateAgesIntervalActiveByColorLink(): G2Spec {
  return {
    type: 'interval',
    padding: 0,
    width: 800,
    transform: [
      { type: 'stackY' },
      { type: 'sortX', by: 'y', reverse: true, slice: 5 },
    ],
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
      format: 'csv',
    },
    axis: false,
    legend: false,
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
    scale: {
      x: { paddingInner: 0.2 },
    },
    state: {
      active: {
        stroke: '#000',
        lineWidth: 1,
        linkFillOpacity: 0.5,
        linkFill: (d) => (d.state === 'CA' ? 'red' : undefined),
      },
      inactive: {
        opacity: 0.6,
      },
    },
    interaction: {
      elementHighlightByColor: {
        link: true,
      },
    },
  };
}

stateAgesIntervalActiveByColorLink.preprocess = disableDelay;

stateAgesIntervalActiveByColorLink.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e1, ...rest] = elements;
  const e2 = rest.find((d) => d.__data__.color !== e1.__data__.color);
  return [
    step(e1, 'pointerover'),
    step(e1, 'pointerout'),
    step(e2, 'pointerover'),
    step(e2, 'pointerout'),
  ];
};
