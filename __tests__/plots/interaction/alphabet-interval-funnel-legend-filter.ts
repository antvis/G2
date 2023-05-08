import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { step } from './utils';

export function alphabetIntervalFunnelLegendFilter(): G2Spec {
  return {
    type: 'interval',
    coordinate: {
      transform: [{ type: 'transpose' }],
    },
    data: [
      { text: '页面', value: 1000 },
      { text: '页面1', value: 900 },
      { text: '页面2', value: 800 },
      { text: '页面3', value: 700 },
    ],
    encode: {
      x: 'text',
      y: 'value',
      color: 'text',
      shape: 'funnel',
    },
    transform: [{ type: 'symmetryY' }],
    scale: { x: { padding: 0 } },
    interaction: { legendFilter: true },
  };
}

alphabetIntervalFunnelLegendFilter.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [, e1] = elements;
  return [step(e1, 'click'), step(e1, 'click')];
};
