import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  height: 300,
  data: [
    { name: 'London', month: 'Jan.', value: 18.9 },
    { name: 'London', month: 'Feb.', value: 28.8 },
    { name: 'London', month: 'Mar.', value: 39.3 },
    { name: 'London', month: 'Apr.', value: 81.4 },
    { name: 'London', month: 'May', value: 47 },
    { name: 'London', month: 'Jun.', value: 20.3 },
    { name: 'London', month: 'Jul.', value: 24 },
    { name: 'London', month: 'Aug.', value: 35.6 },
    { name: 'Berlin', month: 'Jan.', value: 12.4 },
    { name: 'Berlin', month: 'Feb.', value: 23.2 },
    { name: 'Berlin', month: 'Mar.', value: 34.5 },
    { name: 'Berlin', month: 'Apr.', value: 99.7 },
    { name: 'Berlin', month: 'May', value: 52.6 },
    { name: 'Berlin', month: 'Jun.', value: 35.5 },
    { name: 'Berlin', month: 'Jul.', value: 37.4 },
    { name: 'Berlin', month: 'Aug.', value: 42.4 },
  ],
  encode: {
    x: 'month',
    y: 'value',
    color: 'name',
  },
  transform: [
    {
      type: 'dodgeX',
      groupBy: 'x',
      orderBy: 'value',
      padding: 0.1,
    },
  ],
  interaction: {
    legendHighlight: {
      series: true,
    },
  },
  state: { inactive: { opacity: 0.5 } },
});

chart.render();
