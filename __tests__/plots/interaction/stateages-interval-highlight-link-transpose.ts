import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function stateAgesIntervalHighlightLinkTranspose(): G2Spec {
  return {
    type: 'interval',
    height: 600,
    transform: [
      { type: 'stackY' },
      { type: 'sortX', by: 'y', reverse: true, slice: 5 },
    ],
    coordinate: { transform: [{ type: 'transpose' }] },
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
      format: 'csv',
    },
    legend: false,
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
    axis: {
      y: { labelFormatter: '~s' },
    },
    scale: {
      x: { paddingInner: 0.2 },
    },
    state: {
      active: {
        linkFill: (d) => (d.state === 'CA' ? 'red' : undefined),
        stroke: '#000',
        lineWidth: 1,
        linkFillOpacity: 0.5,
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

stateAgesIntervalHighlightLinkTranspose.preprocess = disableDelay;

stateAgesIntervalHighlightLinkTranspose.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e1] = elements;
  return [step(e1, 'pointerover'), step(e1, 'pointerout')];
};
