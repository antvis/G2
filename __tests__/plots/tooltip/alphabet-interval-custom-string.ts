import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function renderString(event, { title, items }) {
  const { offsetX, offsetY } = event;
  return `<dv>
    <h2>${title}</h2>
    <span>(${offsetX | 0}, ${offsetY | 0})</span>
    <ul style="padding-left: 1em">
    ${items
      .map((d) => `<li style="color: ${d.color}">${d.name}: ${d.value}</li>`)
      .join('')}
    </ul>
  </div>`;
}

export function alphabetIntervalCustomString(): G2Spec {
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
      tooltip: {
        render: renderString,
      },
    },
  };
}

alphabetIntervalCustomString.steps = tooltipSteps(0, 1);
