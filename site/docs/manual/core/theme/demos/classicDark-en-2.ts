import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  theme: 'classicDark',
  data: [
    { category: 'A', value: 23 },
    { category: 'B', value: 45 },
    { category: 'C', value: 56 },
    { category: 'D', value: 78 },
    { category: 'E', value: 32 },
  ],
  encode: { x: 'category', y: 'value', color: 'category' },
  axis: {
    x: { grid: true, gridStroke: '#404040' },
    y: { grid: true, gridStroke: '#404040' },
  },
  viewStyle: {
    viewFill: '#1f1f1f',
    plotFill: '#2a2a2a',
    plotStroke: '#404040',
    plotLineWidth: 1,
  },
});

chart.render();
