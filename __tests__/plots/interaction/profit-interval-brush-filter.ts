import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { profit } from '../../data/profit';
import { brush, dblclick } from './penguins-point-brush';

export function profitIntervalBrushFilter(): G2Spec {
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
    interaction: {
      brushFilter: true,
    },
  };
}

profitIntervalBrushFilter.steps = ({ canvas }) => {
  const { document } = canvas;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
  return [
    {
      changeState: () => {
        brush(plot, 500, 50, 600, 300);
      },
    },
    {
      changeState: () => {
        dblclick(plot);
      },
      skip: true,
    },
    {
      changeState: () => {
        brush(plot, 80, 50, 200, 300);
      },
    },
  ];
};
