import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step, disableDelay } from './utils';

export function stateAgesIntervalHighlightLinkPolar(): G2Spec {
  return {
    type: 'interval',
    height: 600,
    transform: [
      { type: 'stackY' },
      { type: 'sortX', by: 'y', reverse: true, slice: 5 },
    ],
    coordinates: [{ type: 'polar' }],
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
    axis: { y: false },
    interactions: [
      {
        type: 'elementHighlightByColor',
        link: true,
        highlightedStroke: '#000',
        highlightedStrokeWidth: 1,
        unhighlightedOpacity: 0.6,
        linkFillOpacity: 0.5,
      },
    ],
  };
}

stateAgesIntervalHighlightLinkPolar.preprocess = disableDelay;

stateAgesIntervalHighlightLinkPolar.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const e1 = elements[elements.length - 1];
  return [step(e1, 'pointerover'), step(e1, 'pointerout')];
};
