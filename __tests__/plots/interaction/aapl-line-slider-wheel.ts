import { format } from 'fecha';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';
import { dispatchSliderZoom } from './utils';

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
        y: 'shift', // Shift + wheel controls Y axis
        wheelSensitivity: 0.1,
        minRange: 0.001,
      },
    },
  };
}

aaplLineSliderWheel.steps = ({ canvas }) => {
  const { document } = canvas;
  const sliders = document.getElementsByClassName(SLIDER_CLASS_NAME);
  const [sliderX, sliderY] = sliders;

  return [
    // Test X axis zoom in (simulate wheel zoom in)
    {
      changeState: () => {
        dispatchSliderZoom(sliderX, 0.5, 0.4); // Zoom in to 50% range, center at 40%
      },
    },
    // Test Y axis zoom in
    {
      changeState: () => {
        dispatchSliderZoom(sliderY, 0.6, 0.5); // Zoom in to 60% range, center at 50%
      },
    },
    // Test X axis zoom out
    {
      changeState: () => {
        dispatchSliderZoom(sliderX, 1.5, 0.4); // Zoom out to 150% of current range
      },
    },
    // Test extreme zoom in to test adaptive sensitivity
    {
      changeState: () => {
        dispatchSliderZoom(sliderX, 0.2, 0.35); // Extreme zoom in to 20% range
      },
    },
  ];
};

aaplLineSliderWheel.tooltip = true;
