import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', value: 51 },
  { month: 'Feb', value: 91 },
  { month: 'Mar', value: 34 },
  { month: 'Apr', value: 47 },
  { month: 'May', value: 63 },
  { month: 'June', value: 58 },
  { month: 'July', value: 56 },
  { month: 'Aug', value: 77 },
  { month: 'Sep', value: 99 },
  { month: 'Oct', value: 106 },
  { month: 'Nov', value: 88 },
  { month: 'Dec', value: 56 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: data,
      encode: {
        x: 'month',
        y: 'value',
        shape: 'hv',
      },
      scale: {
        x: {
          range: [0, 1],
        },
        y: {
          nice: true,
        },
      },
    },
  ],
});

chart.render();
