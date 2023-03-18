import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { step } from './utils';

export function populationIntervalDiverging(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/population.csv',
      transform: [
        {
          type: 'filter',
          callback: (d) => d.year === 2000,
        },
      ],
    },
    coordinate: { transform: [{ type: 'transpose' }] },
    scale: {
      color: { type: 'ordinal', range: ['#ca8861', '#675193'] },
      x: { range: [1, 0] },
    },
    axis: {
      y: { labelFormatter: '~s' },
    },
    encode: {
      x: 'age',
      y: (d) => (d.sex === 1 ? -d.people : d.people),
      color: 'sex',
    },
  };
}

populationIntervalDiverging.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0] = elements;
  return [step(e0, 'click')];
};
