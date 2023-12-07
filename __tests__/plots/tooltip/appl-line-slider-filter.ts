import { format } from 'fecha';
import { CustomEvent } from '@antv/g';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';

export function aaplLineSliderFilter(): G2Spec {
  return {
    type: 'line',
    paddingLeft: 80,
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
    tooltip: { title: '' },
  };
}

export function dispatchValueChange(slider, values = [0.25, 0.75]) {
  slider.update({ values });
  slider.dispatchEvent(
    new CustomEvent('valuechange', {
      nativeEvent: true,
      detail: {
        value: [0.25, 0.75],
      },
    }),
  );
}

aaplLineSliderFilter.steps = ({ canvas }) => {
  const { document } = canvas;
  const sliders = document.getElementsByClassName(SLIDER_CLASS_NAME);
  const [s1] = sliders;
  return [
    {
      changeState: () => {
        dispatchValueChange(s1);
      },
    },
    {
      changeState: async () => {
        const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
        plot.dispatchEvent(
          new CustomEvent('pointermove', {
            offsetX: 200,
            offsetY: 300,
          }),
        );
      },
    },
  ];
};
