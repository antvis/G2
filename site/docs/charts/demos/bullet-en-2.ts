import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

const colors = {
  ranges: ['#ffebee', '#fff3e0', '#e8f5e8'],
  measures: '#1890ff',
  target: '#ff4d4f',
};

// Transform data structure
const transformedData = [
  { title: 'Project Progress', value: 40, level: 'Poor' },
  { title: 'Project Progress', value: 30, level: 'Good' },
  { title: 'Project Progress', value: 30, level: 'Excellent' },
];

chart.options({
  type: 'view',
  coordinate: { transform: [{ type: 'transpose' }] },
  children: [
    {
      type: 'interval',
      data: transformedData,
      encode: { x: 'title', y: 'value', color: 'level' },
      transform: [{ type: 'stackY' }],
      scale: {
        color: {
          domain: ['Poor', 'Good', 'Excellent'],
          range: colors.ranges,
        },
      },
      style: { maxWidth: 30 },
    },
    {
      type: 'interval',
      data: {
        value: [
          { title: 'Project Progress', value: 60, type: 'Actual Progress' },
          { title: 'Project Progress', value: 80, type: 'Target Progress' },
        ],
        transform: [
          { type: 'filter', callback: (d) => d.type === 'Actual Progress' },
        ],
      },
      encode: { x: 'title', y: 'value', color: colors.measures },
      style: { maxWidth: 16 },
    },
    {
      type: 'point',
      data: {
        value: [
          { title: 'Project Progress', value: 60, type: 'Actual Progress' },
          { title: 'Project Progress', value: 80, type: 'Target Progress' },
        ],
        transform: [
          { type: 'filter', callback: (d) => d.type === 'Target Progress' },
        ],
      },
      encode: {
        x: 'title',
        y: 'value',
        shape: 'line',
        color: colors.target,
        size: 8,
      },
      axis: { y: { grid: true, title: 'Progress (%)' }, x: { title: false } },
    },
  ],
});
chart.render();
