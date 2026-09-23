import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

const fields = [
  'lost > 100$',
  'lost <= 100$',
  'gained <= 100$',
  'gained > 100$',
];

chart.options({
  type: 'view',
  paddingLeft: 25,
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/nivo-gain-lost.json',
        transform: [
          {
            type: 'fold',
            fields,
          },
        ],
      },
      encode: { x: 'user', y: 'value', color: 'key' },
      transform: [{ type: 'stackY' }],
      scale: {
        x: { padding: 0.2 },
        y: { domainMin: -100, domainMax: 100 },
        color: {
          domain: fields,
          range: ['#97e3d5', '#61cdbb', '#e25c3b', '#f47560'],
        },
      },
      style: { radius: 10 },
      axis: {
        y: { position: 'right', title: false, labelFormatter: (v) => `${v}%` },
      },
      legend: { color: { title: false } },
      labels: [
        {
          text: 'value',
          position: 'inside',
          formatter: (v) => (v ? `${v}%` : ''),
          transform: [{ type: 'overlapDodgeY' }],
          fill: '#000',
          fontSize: 10,
        },
      ],
    },
    {
      type: 'lineY',
      data: [0],
      style: { lineWidth: 2, stroke: '#e25c3b', strokeOpacity: 1 },
    },
    {
      type: 'text',
      style: {
        x: -10,
        y: '75%',
        text: 'lost',
        fontWeight: 'bold',
        dy: -10,
        transform: 'rotate(-90)',
        fill: '#61cdbb',
      },
    },
    {
      type: 'text',
      style: {
        x: -10,
        y: '20%',
        text: 'gain',
        fontWeight: 'bold',
        dy: -10,
        transform: 'rotate(-90)',
        fill: '#e25c3b',
      },
    },
  ],
});

chart.render();
