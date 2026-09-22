import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

const axisStyle = {
  grid: true,
  gridStroke: '#fff',
  gridLineWidth: 2,
  labelFill: '#d1d5db',
};

chart.options({
  type: 'line',
  theme: {
    type: 'classicDark',
    view: { viewFill: '#0f0f0f', plotFill: '#1a1a1a' },
  },
  data: [
    { year: '2018', value: 30 },
    { year: '2019', value: 40 },
    { year: '2020', value: 35 },
    { year: '2021', value: 50 },
    { year: '2022', value: 49 },
    { year: '2023', value: 70 },
  ],
  encode: { x: 'year', y: 'value' },
  style: { stroke: '#60a5fa', lineWidth: 3 },
  axis: {
    x: axisStyle,
    y: axisStyle,
  },
});

chart.render();
