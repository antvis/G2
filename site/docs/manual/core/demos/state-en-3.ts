import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  state: {
    selected: { fill: 'red' },
    active: { fill: 'green', stroke: 'black', lineWidth: 1 },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});

chart.render();
