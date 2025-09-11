import { CustomEvent } from '@antv/g';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';

export function stocksLineSliderWheel(): G2Spec {
  return {
    type: 'line',
    paddingLeft: 80,
    data: {
      type: 'fetch',
      value: 'data/stocks.csv',
    },
    encode: {
      x: 'date',
      y: 'price',
      color: 'symbol',
    },
    axis: {
      x: { title: false, size: 40 },
      y: { title: false, size: 36 },
    },
    slider: {
      x: { formatter: () => '' },
      y: { labelFormatter: '~s' },
    },
    interaction: {
      sliderFilter: true,
      sliderWheel: {
        x: true,
        y: 'shift',
        wheelSensitivity: 0.05,
        minRange: 0.01,
      },
    },
  };
}

stocksLineSliderWheel.steps = ({ canvas }) => {
  const { document } = canvas;
  const sliders = document.getElementsByClassName(SLIDER_CLASS_NAME);
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);

  return [
    // Test normal wheel for X axis zoom in
    {
      changeState: () => {
        plot.dispatchEvent(
          new CustomEvent('wheel', {
            deltaY: -100,
            offsetX: 300,
            offsetY: 200,
          }),
        );
      },
    },
    // Test Shift + wheel for Y axis zoom in
    {
      changeState: () => {
        plot.dispatchEvent(
          new CustomEvent('wheel', {
            deltaY: -100,
            shiftKey: true,
            offsetX: 300,
            offsetY: 200,
          }),
        );
      },
    },
    // Test wheel zoom out
    {
      changeState: () => {
        plot.dispatchEvent(
          new CustomEvent('wheel', {
            deltaY: 100,
            offsetX: 300,
            offsetY: 200,
          }),
        );
      },
    },
  ];
};

stocksLineSliderWheel.tooltip = true;
