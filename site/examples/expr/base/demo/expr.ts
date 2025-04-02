import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const spec = {
  type: 'interval',
  height: 640,
  width: 640,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta' },
  scale: {
    color: { palette: 'spectral' },
  },
  encode: { y: 'value', color: 'name' },
  style: { stroke: 'white' },
  labels: [
    {
      text: '{"*" + a.name}',
      radius: '{a.value>15000000 ? a.value>20000000 ? 0.6 : 0.75 : 0.9}',
      style: {
        fontSize: '{a.value>15000000 ? a.value>20000000 ? 20 : 15 : 9}',
        fontWeight: 'bold',
      },
    },
    {
      text: '{b < c.length - 3 ? a.value : ""}',
      radius: '{a.value>15000000 ? a.value>20000000 ? 0.6 : 0.75 : 0.9}',
      style: { fontSize: 9, dy: 12 },
    },
  ],
  animate: { enter: { type: 'waveIn', duration: 1000 } },
};

chart.options(spec);

chart.render();
