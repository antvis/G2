import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';
import { renderString } from './alphabet-interval-custom-string';

export function render(event, { title, items }) {
  const $div = document.createElement('div');
  const string = renderString(event, { title, items });
  $div.innerHTML = string;
  return $div;
}

export function alphabetIntervalCustomDom(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    tooltip: ['letter', 'frequency'],
    interaction: {
      tooltip: { render },
    },
  };
}

alphabetIntervalCustomDom.steps = tooltipSteps(0, 1);
