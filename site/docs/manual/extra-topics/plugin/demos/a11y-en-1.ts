import { Plugin } from '@antv/g-plugin-a11y';
import { Chart } from '@antv/g2';

const plugin = new Plugin({ enableExtractingText: true });

const labelFormatter = (d) => Math.abs(d) + (d < 0 ? 'BC' : d > 0 ? 'AC' : '');
const left = (d) => d.end > -1500 && d.start > -3000;

const chart = new Chart({
  container: 'container',
  width: 900,
  height: 1000,
  plugins: [plugin],
});

chart.options({
  type: 'interval',
  width: 900,
  height: 1000,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/world-history.json',
  },
  encode: { x: 'civilization', y: ['start', 'end'], color: 'region' },
  transform: [
    { type: 'sortX', by: 'y' },
    { type: 'sortColor', by: 'y', reducer: 'min' },
  ],
  scale: { color: { palette: 'set2' } },
  coordinate: { transform: [{ type: 'transpose' }] },
  axis: { x: false },
  labels: [
    {
      text: 'civilization',
      position: (d) => (left(d) ? 'left' : 'right'),
      textAlign: (d) => (left(d) ? 'end' : 'start'),
      dx: (d) => (left(d) ? -5 : 5),
      fontSize: 10,
    },
  ],
  tooltip: {
    items: [
      {
        name: 'start',
        field: 'start',
        valueFormatter: labelFormatter,
      },
      {
        name: 'end',
        field: 'end',
        valueFormatter: labelFormatter,
      },
    ],
  },
});
chart.render();
