import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  coordinate: {
    transform: [{ type: 'fisheye', focusX: 0.5, focusY: 0.5 }],
  },
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point',
  },
  scale: {
    size: {
      type: 'log',
      range: [4, 20],
    },
  },
  style: {
    fillOpacity: 0.3,
    lineWidth: 1,
  },
});

chart.render();
