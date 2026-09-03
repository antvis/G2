import { Chart } from '@antv/g2';

const data = [
  { item: 'Design', type: 'a', score: 70 },
  { item: 'Design', type: 'b', score: 30 },
  { item: 'Development', type: 'a', score: 60 },
  { item: 'Development', type: 'b', score: 70 },
  { item: 'Marketing', type: 'a', score: 50 },
  { item: 'Marketing', type: 'b', score: 60 },
  { item: 'Users', type: 'a', score: 40 },
  { item: 'Users', type: 'b', score: 50 },
  { item: 'Test', type: 'a', score: 60 },
  { item: 'Test', type: 'b', score: 70 },
  { item: 'Language', type: 'a', score: 70 },
  { item: 'Language', type: 'b', score: 50 },
  { item: 'Technology', type: 'a', score: 50 },
  { item: 'Technology', type: 'b', score: 40 },
  { item: 'Support', type: 'a', score: 30 },
  { item: 'Support', type: 'b', score: 40 },
  { item: 'Sales', type: 'a', score: 60 },
  { item: 'Sales', type: 'b', score: 40 },
  { item: 'UX', type: 'a', score: 50 },
  { item: 'UX', type: 'b', score: 60 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  coordinate: { type: 'polar' },
  data: data,
  scale: {
    x: { padding: 0.5, align: 0 },
    y: { tickCount: 5 },
  },
  axis: {
    x: { grid: true },
    y: { zIndex: 1, title: false },
  },
  interaction: {
    tooltip: { crosshairsLineDash: [4, 4] },
  },
  children: [
    {
      type: 'area',
      encode: {
        x: 'item',
        y: 'score',
        color: 'type',
        shape: 'smooth',
      },
      style: {
        fillOpacity: 0.5,
      },
      scale: {
        y: { domainMax: 80 },
      },
    },
    {
      type: 'line',
      encode: {
        x: 'item',
        y: 'score',
        color: 'type',
        shape: 'smooth',
      },
      style: {
        lineWidth: 2,
      },
    },
  ],
});

chart.render();
