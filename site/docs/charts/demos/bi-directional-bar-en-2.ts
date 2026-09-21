import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const types = [
  'Strongly disagree',
  'Disagree',
  'Neither agree nor disagree',
  'Agree',
  'Strongly agree',
];
const colors = ['#c30d24', '#f3a583', '#cccccc', '#94c6da', '#1770ab'];

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/82c97016-0f99-433b-ab21-9ecf14244610.csv',
  },
  transform: [{ type: 'stackY' }],
  encode: {
    x: 'question',
    y: (d) =>
      d.type === 'Disagree' || d.type === 'Strongly disagree'
        ? -d.percentage
        : d.type === 'Neither agree nor disagree'
        ? -d.percentage / 2
        : +d.percentage,
    color: 'type',
  },

  scale: {
    x: { padding: 0.5 },
    color: { domain: types, range: colors },
  },
  axis: {
    x: { title: '' },
    y: {
      labelFormatter: (d) => {
        return Math.abs(d);
      },
    },
  },

  tooltip: {
    items: [
      (d, i, data, column) => ({
        name: d.type,
        value: d.percentage,
      }),
    ],
  },
});

chart.render();
