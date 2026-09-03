import { Chart } from '@antv/g2';

const data = [
  { x: 'Parking Difficult', value: 95 },
  { x: 'Sales Rep was Rude', value: 60 },
  { x: 'Poor Lighting', value: 45 },
  { x: 'Layout Confusing', value: 37 },
  { x: 'Sizes Limited', value: 30 },
  { x: 'Clothing Faded', value: 27 },
  { x: 'Clothing Shrank', value: 18 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  title: 'Pareto Chart of Customer Complaints',
  data: {
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'custom',
        // calucate accumulate and percentage fields.
        callback: (data) => {
          const sum = data.reduce((r, curr) => r + curr.value, 0);
          return data
            .map((d) => ({ ...d, percentage: d.value / sum }))
            .reduce((r, curr) => {
              const v = r.length ? r[r.length - 1].accumulate : 0;
              const accumulate = v + curr.percentage;
              r.push({ ...curr, accumulate });
              return r;
            }, []);
        },
      },
    ],
  },
  children: [
    {
      type: 'interval',
      encode: {
        x: 'x',
        y: 'value',
      },
      style: {
        fill: (d) => (d.percentage < 0.1 ? '#E24B26' : '#78B3F0'),
      },
      scale: {
        x: { padding: 1 / 2 },
        y: { domainMax: 312, tickCount: 5 },
      },
      axis: {
        x: { title: null },
        y: { title: 'Defect frequency' },
      },
      labels: [
        {
          text: (d) => `${(d.percentage * 100).toFixed(1)}%`,
          textBaseline: 'bottom',
        },
      ],
    },
    {
      type: 'line',
      encode: {
        x: 'x',
        y: 'accumulate',
      },
      scale: {
        y: { independent: true, domainMin: 0, tickCount: 5 },
      },
      axis: {
        y: {
          position: 'right',
          title: 'Cumulative Percentage',
          grid: null,
          labelFormatter: (d) => `${(d * 100).toFixed(0)}%`,
        },
      },
      tooltip: {
        items: [
          {
            channel: 'y',
            valueFormatter: (d) => `${(d * 100).toFixed(2)}%`,
          },
        ],
      },
    },
    {
      type: 'point',
      encode: {
        x: 'x',
        y: 'accumulate',
        shape: 'diamond',
      },
      scale: {
        y: { independent: true, domainMin: 0 },
      },
      axis: {
        y: null,
      },
      tooltip: null,
    },
  ],
});

chart.render();
