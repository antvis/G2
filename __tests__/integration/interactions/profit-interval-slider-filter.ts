import { G2Spec } from '../../../src';
import { profit } from '../data/profit';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/native/sliderFilter';
import { dispatchValueChange } from './appl-line-slider-filter';

export function profitIntervalSliderFilter(): G2Spec {
  return {
    type: 'interval',
    data: profit,
    paddingLeft: 100,
    encode: {
      x: 'month',
      y: ['end', 'start'],
      color: (d) =>
        d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
    },
    axis: { y: { labelFormatter: '~s' } },
    slider: {
      x: true,
      y: { labelFormatter: '~s' },
    },
    interactions: [{ type: 'sliderFilter' }],
  };
}

profitIntervalSliderFilter.steps = ({ canvas }) => {
  const { document } = canvas;
  const sliders = document.getElementsByClassName(SLIDER_CLASS_NAME);
  const [s1, s2] = sliders;
  return [
    {
      changeState: () => {
        dispatchValueChange(s1);
      },
    },
    {
      changeState: () => {
        dispatchValueChange(s2);
      },
    },
  ];
};
