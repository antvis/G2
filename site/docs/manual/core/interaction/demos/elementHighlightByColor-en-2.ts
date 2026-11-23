import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  state: {
    active: {
      fill: 'red',
      linkRadius: 50,
      linkFill: 'green',
      linkFillOpacity: 0.9,
      linkStroke: '#DAF5EC',
      linkStrokeOpacity: 0.9,
      linkLineWidth: 2,
      linkOpacity: 1,
      linkCursor: 'pointer',
    },
    inactive: { opacity: 0.5 },
  },
  axis: { y: { labelFormatter: '~s' } },
  interaction: {
    elementHighlightByColor: { link: true, background: true },
  },
});

chart.render();
