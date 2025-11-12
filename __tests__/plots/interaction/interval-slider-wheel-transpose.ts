import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';
import { dispatchSliderZoom } from './utils';

export function intervalSliderWheelTranspose(): G2Spec {
  return {
    type: 'interval',
    paddingLeft: 80,
    data: [
      { month: 'Jan', sales: 100 },
      { month: 'Feb', sales: 150 },
      { month: 'Mar', sales: 200 },
      { month: 'Apr', sales: 120 },
      { month: 'May', sales: 180 },
      { month: 'Jun', sales: 220 },
      { month: 'Jul', sales: 190 },
      { month: 'Aug', sales: 160 },
      { month: 'Sep', sales: 210 },
      { month: 'Oct', sales: 240 },
      { month: 'Nov', sales: 200 },
      { month: 'Dec', sales: 250 },
    ],
    encode: {
      x: 'month',
      y: 'sales',
    },
    coordinate: { transform: [{ type: 'transpose' }] },
    axis: {
      x: { title: false, size: 40 },
      y: { title: false, size: 36 },
    },
    slider: {
      x: true,
      y: { labelFormatter: '~s' },
    },
    interaction: {
      sliderFilter: true,
      sliderWheel: {
        x: 'ctrl', // Ctrl + wheel controls X axis
        y: 'shift', // Shift + wheel controls Y axis
        wheelSensitivity: 0.08,
        minRange: 0.05,
      },
    },
  };
}

intervalSliderWheelTranspose.steps = ({ canvas }) => {
  const { document } = canvas;
  const sliders = document.getElementsByClassName(SLIDER_CLASS_NAME);
  const [sliderX, sliderY] = sliders;

  return [
    // Test X axis zoom in (simulate Ctrl + wheel in transposed coordinate)
    {
      changeState: () => {
        dispatchSliderZoom(sliderX, 0.6, 0.5); // Zoom in to 60% range, center at 50%
      },
    },
    // Test Y axis zoom in (simulate Shift + wheel in transposed coordinate)
    {
      changeState: () => {
        dispatchSliderZoom(sliderY, 0.5, 0.4); // Zoom in to 50% range, center at 40%
      },
    },
    // Test Y axis zoom out
    {
      changeState: () => {
        dispatchSliderZoom(sliderY, 1.5, 0.4); // Zoom out to 150% of current range
      },
    },
    // Test X axis zoom out
    {
      changeState: () => {
        dispatchSliderZoom(sliderX, 1.3, 0.5); // Zoom out to 130% of current range
      },
    },
  ];
};

intervalSliderWheelTranspose.tooltip = true;
