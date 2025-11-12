import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';
import { dispatchSliderZoom } from './utils';

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
  const [sliderX, sliderY] = sliders;

  return [
    // Test X axis zoom in (simulate normal wheel)
    {
      changeState: () => {
        dispatchSliderZoom(sliderX, 0.6, 0.5); // Zoom in to 60% range, center at 50%
      },
    },
    // Test Y axis zoom in (simulate Shift + wheel)
    {
      changeState: () => {
        dispatchSliderZoom(sliderY, 0.5, 0.4); // Zoom in to 50% range, center at 40%
      },
    },
    // Test X axis zoom out
    {
      changeState: () => {
        dispatchSliderZoom(sliderX, 1.4, 0.5); // Zoom out to 140% of current range
      },
    },
    // Test extreme zoom in on Y axis
    {
      changeState: () => {
        dispatchSliderZoom(sliderY, 0.3, 0.4); // Extreme zoom in to 30% range
      },
    },
  ];
};

stocksLineSliderWheel.tooltip = true;
