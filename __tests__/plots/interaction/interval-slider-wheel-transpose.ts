import { CustomEvent } from '@antv/g';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';

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
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);

  return [
    // Test Ctrl + wheel for X axis (should work with horizontal slider in transposed coordinate)
    {
      changeState: () => {
        plot.dispatchEvent(
          new CustomEvent('wheel', {
            deltaY: -80,
            ctrlKey: true,
            offsetX: 200,
            offsetY: 150,
          }),
        );
      },
    },
    // Test Shift + wheel for Y axis (should work with vertical slider in transposed coordinate)
    {
      changeState: () => {
        plot.dispatchEvent(
          new CustomEvent('wheel', {
            deltaY: -80,
            shiftKey: true,
            offsetX: 200,
            offsetY: 150,
          }),
        );
      },
    },
    // Test wheel without modifier keys (should not respond)
    {
      changeState: () => {
        plot.dispatchEvent(
          new CustomEvent('wheel', {
            deltaY: -100,
            offsetX: 200,
            offsetY: 150,
          }),
        );
      },
    },
    // Test zoom out with Ctrl + wheel
    {
      changeState: () => {
        plot.dispatchEvent(
          new CustomEvent('wheel', {
            deltaY: 120,
            ctrlKey: true,
            offsetX: 200,
            offsetY: 150,
          }),
        );
      },
    },
  ];
};

intervalSliderWheelTranspose.tooltip = true;
