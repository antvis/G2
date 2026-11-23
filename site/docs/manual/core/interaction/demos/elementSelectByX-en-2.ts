import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  paddingLeft: 50,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  axis: { y: { labelFormatter: '~s' } },
  state: {
    selected: {
      offset: 10,
      radius: 50,
      fill: (d) => (d.population > 1000000 ? '#F5222D' : '#1890FF'),
      fillOpacity: 0.9,
      stroke: (d) => (d.population > 1000000 ? '#FF4D4F' : '#40A9FF'),
      strokeOpacity: 0.9,
      lineWidth: 2,
      lineDash: [4, 8],
      opacity: 1,
      shadowColor: (d) => (d.population > 1000000 ? '#F5222D' : '#1890FF'),
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      cursor: 'pointer',
      backgroundRadius: 50,
      backgroundFill: (d) => (d.population > 1000000 ? '#FFF1F0' : '#E6F7FF'),
      backgroundFillOpacity: 0.9,
      backgroundStroke: (d) => (d.population > 1000000 ? '#FFA39E' : '#91D5FF'),
      backgroundStrokeOpacity: 0.9,
      backgroundLineWidth: 2,
      backgroundLineDash: [4, 8],
      backgroundOpacity: 1,
      backgroundShadowColor: (d) =>
        d.population > 1000000 ? '#FFA39E' : '#91D5FF',
      backgroundShadowBlur: 10,
      backgroundShadowOffsetX: 5,
      backgroundShadowOffsetY: 5,
      backgroundCursor: 'pointer',
    },
  },
  interaction: {
    elementSelectByX: {
      background: true,
    },
  },
});

chart.render();
