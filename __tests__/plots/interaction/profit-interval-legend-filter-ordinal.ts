import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction';
import { profit } from '../../data/profit';
import { step } from './utils';

export function profitIntervalLegendFilterOrdinal(): G2Spec {
  return {
    paddingLeft: 60,
    type: 'interval',
    data: profit,
    axis: { x: { animate: false }, y: { labelFormatter: '~s' } },
    encode: {
      x: 'month',
      y: ['end', 'start'],
      color: (d) =>
        d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
    },
    interaction: {
      legendFilter: {
        labelUnselectedOpacity: 0.5,
        markerUnselectedOpacity: 0.5,
      },
    },
  };
}

profitIntervalLegendFilterOrdinal.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0, e1] = elements;
  return [step(e0, 'click'), step(e1, 'click'), step(e0, 'click')];
};
