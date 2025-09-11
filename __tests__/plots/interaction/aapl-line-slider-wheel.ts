import { format } from 'fecha';
import { CustomEvent } from '@antv/g';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';

export function aaplLineSliderWheel(): G2Spec {
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
    interaction: {
      sliderFilter: true,
      sliderWheel: {
        x: true, // Normal wheel controls X axis
        y: true, // Normal wheel also controls Y axis (simultaneous)
        wheelSensitivity: 0.1,
        minRange: 0.001,
      },
    },
  };
}

aaplLineSliderWheel.steps = ({ canvas }) => {
  const { document } = canvas;
  const sliders = document.getElementsByClassName(SLIDER_CLASS_NAME);
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);

  return [
    // Test simultaneous X and Y zoom in
    {
      changeState: () => {
        plot.dispatchEvent(
          new CustomEvent('wheel', {
            deltaY: -50,
            offsetX: 250,
            offsetY: 150,
          }),
        );
      },
    },
    // Test zoom out to a larger range
    {
      changeState: () => {
        plot.dispatchEvent(
          new CustomEvent('wheel', {
            deltaY: 200,
            offsetX: 250,
            offsetY: 150,
          }),
        );
      },
    },
    // Test extreme zoom in to test adaptive sensitivity
    {
      changeState: () => {
        plot.dispatchEvent(
          new CustomEvent('wheel', {
            deltaY: -300,
            offsetX: 250,
            offsetY: 150,
          }),
        );
      },
    },
    // Test recovery from extreme zoom
    {
      changeState: () => {
        plot.dispatchEvent(
          new CustomEvent('wheel', {
            deltaY: 150,
            offsetX: 250,
            offsetY: 150,
          }),
        );
      },
    },
  ];
};

aaplLineSliderWheel.tooltip = true;
