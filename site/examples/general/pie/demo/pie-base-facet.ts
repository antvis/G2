import { Chart } from '@antv/g2';

const data = [
  { type: '男性', percent: 56.4, color: '#0a9afe' },
  { type: '女性', percent: 43.6, color: '#f0657d' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'facetRect',
  data: data,
  encode: {
    x: 'type',
  },
  axis: false,
  legend: false,
  children: [
    {
      type: 'view',
      frame: false,
      coordinate: { type: 'theta', innerRadius: 0.5, outerRadius: 0.8 },
      children: [
        {
          type: 'interval',
          encode: {
            y: 100,
          },
          scale: {
            y: { zero: true },
          },
          style: {
            fill: '#e8e8e8',
          },
          tooltip: false,
          animate: false,
        },
        {
          type: 'interval',
          encode: {
            y: 'percent',
            color: 'color',
          },
          scale: {
            color: { type: 'identity' },
          },
          tooltip: {
            items: [
              (data) => ({
                name: data.type,
                value: data.percent,
              }),
            ],
          },
          animate: {
            enter: { type: 'waveIn', duration: 1000 },
          },
        },
        {
          type: 'text',
          encode: {
            text: 'type',
          },
          style: {
            textAlign: 'center',
            textBaseline: 'middle',
            fontSize: 20,
            color: '#8c8c8c',
            x: '50%',
            y: '50%',
            dy: -20,
          },
        },
        {
          type: 'text',
          encode: {
            text: 'percent',
          },
          style: {
            textAlign: 'center',
            textBaseline: 'middle',
            fontSize: 30,
            fontWeight: 500,
            color: '#000',
            x: '50%',
            y: '50%',
            dy: 20,
          },
        },
      ],
    },
  ],
});

chart.render();
