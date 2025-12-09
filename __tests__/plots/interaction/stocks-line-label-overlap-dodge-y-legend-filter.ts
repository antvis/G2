import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { step } from './utils';

export function stocksLineLabelOverlapDodgeYLegendFilter(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/stocks2.csv',
    },
    encode: {
      x: (d) => new Date(d.date).getFullYear(),
      y: 'price',
      color: 'symbol',
    },
    transform: [{ type: 'groupX', y: 'mean' }],
    labels: [
      {
        text: 'price',
        transform: [{ type: 'overlapDodgeY' }],
        fontSize: 10,
      },
    ],
    legend: {
      color: {
        defaultSelect: [],
      },
    },
  };
}

stocksLineLabelOverlapDodgeYLegendFilter.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0, e1, e2] = elements;
  return [
    // Step 0: Initial state - all deselected (defaultSelect: [])
    step(e0, 'click'), // Step 1: Select first item
    step(e1, 'click'), // Step 2: Select second item
    step(e0, 'click'), // Step 3: Deselect first, only second selected
    step(e1, 'click'), // Step 4: Deselect second, back to all deselected
  ];
};
