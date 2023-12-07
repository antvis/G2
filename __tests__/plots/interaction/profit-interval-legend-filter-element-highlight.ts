import { ELEMENT_CLASS_NAME, G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { profit } from '../../data/profit';
import { step } from './utils';

export function profitIntervalLegendFilterElementHighlight(): G2Spec {
  return {
    paddingLeft: 60,
    type: 'interval',
    data: profit,
    axis: { x: { animate: false }, y: { labelFormatter: '~s' } },
    legend: {
      color: {
        state: { unselected: { labelOpacity: 0.5, markerOpacity: 0.5 } },
      },
    },
    encode: {
      x: 'month',
      y: ['end', 'start'],
      color: (d) =>
        d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
    },
    state: { active: { fill: 'red' } },
    interaction: { elementHighlight: true },
  };
}

profitIntervalLegendFilterElementHighlight.steps = ({ canvas }) => {
  const { document } = canvas;
  const items = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);

  const [i0] = items;
  return [
    step(i0, 'click', { skip: true }),
    step(i0, 'click', { skip: true }),
    {
      changeState: () => {
        const [e0] = document.getElementsByClassName(ELEMENT_CLASS_NAME);
        step(e0, 'pointerover').changeState();
      },
    },
  ];
};
