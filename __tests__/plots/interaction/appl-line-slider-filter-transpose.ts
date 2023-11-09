import { format } from 'fecha';
import { G2Spec } from '../../../src';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';
import { dispatchValueChange } from './appl-line-slider-filter';

export function aaplLineSliderFilterTranspose(): G2Spec {
  return {
    type: 'line',
    paddingLeft: 80,
    coordinate: { transform: [{ type: 'transpose' }] },
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    encode: {
      x: (d) => new Date(d.date),
      y: 'close',
    },
    axis: {
      x: { title: false, size: 40 },
      y: { title: false, size: 36 },
    },
    slider: {
      x: { labelFormatter: (d) => format(d, 'YYYY/M/D') },
      y: { labelFormatter: '~s' },
    },
  };
}

aaplLineSliderFilterTranspose.steps = ({ canvas }) => {
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
