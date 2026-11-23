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
  state: {
    selected: {
      offset: 10,
      radius: 50,
      fill: (d) => (d.frequency > 0.1 ? '#F5222D' : '#1890FF'),
      fillOpacity: 0.9,
      stroke: (d) => (d.frequency > 0.1 ? '#FF4D4F' : '#40A9FF'),
      strokeOpacity: 0.9,
      lineWidth: 2,
      lineDash: [4, 8],
      opacity: 1,
      shadowColor: (d) => (d.frequency > 0.1 ? '#F5222D' : '#1890FF'),
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      cursor: 'pointer',
      backgroundRadius: 50,
      backgroundFill: (d) => (d.frequency > 0.1 ? '#FFF1F0' : '#E6F7FF'),
      backgroundFillOpacity: 0.9,
      backgroundStroke: (d) => (d.frequency > 0.1 ? '#FFA39E' : '#91D5FF'),
      backgroundStrokeOpacity: 0.9,
      backgroundLineWidth: 2,
      backgroundLineDash: [4, 8],
      backgroundOpacity: 1,
      backgroundShadowColor: (d) => (d.frequency > 0.1 ? '#FFA39E' : '#91D5FF'),
      backgroundShadowBlur: 10,
      backgroundShadowOffsetX: 5,
      backgroundShadowOffsetY: 5,
      backgroundCursor: 'pointer',
    },
  },
  interaction: {
    elementSelect: {
      background: true,
    },
  },
});

chart.render();
