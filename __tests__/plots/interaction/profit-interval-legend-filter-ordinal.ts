import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { profit } from '../../data/profit';
import { step } from './utils';

export function profitIntervalLegendFilterOrdinal(): G2Spec {
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
  };
}

profitIntervalLegendFilterOrdinal.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0, e1] = elements;
  return [step(e0, 'click'), step(e1, 'click'), step(e0, 'click')];
};
