import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  width: 900,
  height: 800,
  paddingLeft: 0,
  paddingRight: 0,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/3041da62-1bf4-4849-aac3-01a387544bf4.csv',
  },
  transform: [
    { type: 'flexX', reducer: 'sum' },
    { type: 'stackY' },
    { type: 'normalizeY' },
  ],
  encode: { x: 'market', y: 'value', color: 'segment' },
  scale: { x: { paddingOuter: 0, paddingInner: 0.01 } },
});
chart.render();
