import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  height: 600,
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  legend: false,
  encode: {
    x: 'state',
    y: 'population',
    color: 'age',
  },
  axis: {
    y: { labelFormatter: '~s' },
  },
  scale: {
    x: { paddingInner: 0.2 },
  },
  state: {
    active: {
      linkFill: (d) => (d.state === 'CA' ? 'red' : undefined),
      stroke: '#000',
      lineWidth: 1,
      linkFillOpacity: 0.5,
    },
    inactive: {
      opacity: 0.6,
    },
  },
  interaction: {
    elementHighlightByColor: {
      link: true,
    },
  },
});

chart.render();
