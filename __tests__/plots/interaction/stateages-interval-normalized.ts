import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { step } from './utils';

export function stateAgesIntervalNormalized(): G2Spec {
  return {
    type: 'interval',
    width: 800,
    height: 1000,
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
    },
    coordinate: { transform: [{ type: 'transpose' }] },
    transform: [
      { type: 'stackY' },
      { type: 'sortX', by: 'y', reverse: true, reducer: 'sum' },
      { type: 'normalizeY' },
    ],
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
  };
}

stateAgesIntervalNormalized.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0] = elements;
  return [step(e0, 'click')];
};
