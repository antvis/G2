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
    coordinates: [{ type: 'transpose' }],
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
    interactions: [
      {
        type: 'elementHighlightByColor',
        link: true,
        linkFill: (d) => (d.state === 'CA' ? 'red' : undefined),
        highlightedStroke: '#000',
        highlightedStrokeWidth: 1,
        unhighlightedOpacity: 0.6,
        linkFillOpacity: 0.5,
      },
    ],
  };
}

stateAgesIntervalHighlightLinkTranspose.preprocess = disableDelay;

stateAgesIntervalHighlightLinkTranspose.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e1] = elements;
  return [step(e1, 'pointerover'), step(e1, 'pointerout')];
};
