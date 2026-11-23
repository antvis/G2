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
    // On hover: green fill + black stroke
    active: { fill: 'green', stroke: 'black', strokeWidth: 1 },
    // On selection: red fill (overrides active fill) + keeps active stroke
    selected: { fill: 'red' },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});

chart.render();
