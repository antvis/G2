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
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  encode: {
    x: 'state',
    y: 'population',
    color: 'age',
  },
  axis: { y: { labelFormatter: '~s' } },
  state: {
    selected: {
      offset: 10,
      radius: 50,
      fill: (d) => (d.population > 1000000 ? 'red' : '#000'),
      fillOpacity: 0.9,
      stroke: '#DAF5EC',
      strokeOpacity: 0.9,
      lineWidth: 2,
      lineDash: [4, 8],
      opacity: 1,
      shadowColor: '#d3d3d3',
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      cursor: 'pointer',
      backgroundRadius: 50,
      backgroundFill: (d) => (d.population > 1000000 ? 'red' : '#000'),
      backgroundFillOpacity: 0.9,
      backgroundStroke: '#DAF5EC',
      backgroundStrokeOpacity: 0.9,
      backgroundLineWidth: 2,
      backgroundLineDash: [4, 8],
      backgroundOpacity: 1,
      backgroundShadowColor: '#d3d3d3',
      backgroundShadowBlur: 10,
      backgroundShadowOffsetX: 10,
      backgroundShadowOffsetY: 10,
      backgroundCursor: 'pointer',
      linkFillOpacity: 0.5,
    },
  },
  interaction: {
    elementSelectByColor: {
      background: true,
      link: true,
    },
  },
});

chart.render();
