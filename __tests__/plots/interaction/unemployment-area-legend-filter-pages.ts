import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { step } from './utils';

export function unemploymentAreaLegendFilterPages(): G2Spec {
  return {
    width: 800,
    type: 'area',
    data: {
      type: 'fetch',
      value: 'data/unemployment-by-industry.csv',
    },
    transform: [{ type: 'stackY' }],
    encode: {
      x: 'date',
      y: 'unemployed',
      color: 'industry',
    },
    legend: { color: { maxRows: 1 } },
    interaction: { tooltip: false },
  };
}

unemploymentAreaLegendFilterPages.steps = ({ canvas }) => {
  const { document } = canvas;
  const [, page] = document.getElementsByClassName('items-item-page');
  const elements = page.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0] = elements;
  return [step(e0, 'click')];
};
