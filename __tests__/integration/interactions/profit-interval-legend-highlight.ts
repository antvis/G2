import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction';
import { CATEGORY_LEGEND_CLASS_NAME } from '../../../src/interaction/native/legendFilter';
import { profit } from '../data/profit';
import { step } from './utils';

export function profitIntervalLegendHighlight(): G2Spec {
  return {
    paddingLeft: 60,
    type: 'interval',
    data: profit,
    axis: { y: { labelFormatter: '~s' } },
    encode: {
      x: 'month',
      y: ['end', 'start'],
      color: (d) =>
        d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
    },
    interactions: [
      {
        type: 'legendHighlight',
        unhighlightedOpacity: 0.5,
        labelUnhighlightedOpacity: 0.5,
        markerUnhighlightedOpacity: 0.5,
      },
    ],
  };
}

profitIntervalLegendHighlight.steps = ({ canvas }) => {
  const { document } = canvas;
  const legend = document.getElementsByClassName(CATEGORY_LEGEND_CLASS_NAME)[0];
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0, e1] = elements;
  return [
    step(e0, 'pointerover'),
    step(e1, 'pointerover'),
    step(legend, 'pointerout'),
  ];
};
