import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'weight', y: 'height', color: 'gender', shape: 'point' },
  style: {
    fillOpacity: 0.7,
    transform: 'scale(1, 1)',
    transformOrigin: 'center center',
  },
  state: {
    inactive: {
      fill: 'black',
      fillOpacity: 0.5,
      transform: 'scale(0.5, 0.5)',
    },
  },
  interaction: { brushXHighlight: true },
});

chart.render();
