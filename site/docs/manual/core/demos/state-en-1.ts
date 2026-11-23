import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
const state = {
  selected: { fill: 'red' },
  active: { fill: 'green', stroke: 'black', lineWidth: 1 },
};
chart.options({
  type: 'interval',
  data: [
    { type: 'A', value: 30 },
    { type: 'B', value: 50 },
    { type: 'C', value: 20 },
  ],
  encode: { x: 'type', y: 'value' },
  state: {
    active: { fill: 'red', stroke: 'blue', strokeWidth: 2 },
    inactive: { fill: '#aaa' },
    selected: { fill: 'orange', stroke: 'black', strokeWidth: 2 },
    unselected: { fill: '#eee' },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});
chart.render();
