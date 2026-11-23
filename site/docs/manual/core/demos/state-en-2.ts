import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { type: 'A', value: 30 },
    { type: 'B', value: 50 },
    { type: 'C', value: 20 },
  ],
  encode: { x: 'type', y: 'value' },
  state: {
    active: {
      fill: (d) => (d.value > 40 ? 'red' : 'blue'),
    },
  },
  interaction: { elementHighlight: true },
});

chart.render();
