import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
  axis: { y: { labelFormatter: '.0%' } },
  scale: {
    y: {
      nice: true,
    },
  },
  state: {
    active: {
      offset: 1,
      backgroundRadius: 8,
      backgroundFill: (d) => (d.frequency > 0.1 ? '#EF4444' : '#3B82F6'),
      backgroundFillOpacity: 0.15,
      backgroundStroke: (d) => (d.frequency > 0.1 ? '#EF4444' : '#3B82F6'),
      backgroundStrokeOpacity: 0.8,
      backgroundLineWidth: 2,
      backgroundShadowColor: (d) => (d.frequency > 0.1 ? '#EF4444' : '#3B82F6'),
      backgroundShadowBlur: 8,
      backgroundShadowOffsetX: 0,
      backgroundShadowOffsetY: 2,
      backgroundCursor: 'pointer',
      fill: '#FFFFFF',
      stroke: (d) => (d.frequency > 0.1 ? '#EF4444' : '#3B82F6'),
      strokeWidth: 2,
    },
  },
  interaction: {
    elementHighlight: {
      background: true,
    },
  },
});

chart.render();
