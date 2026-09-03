import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const colorScale = {
  palette: 'cool',
  offset: (t) => t * 0.8 + 0.1,
};

chart.options({
  type: 'spaceLayer',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    format: 'csv',
  },
  children: [
    {
      type: 'interval',
      transform: [{ type: 'sortX', reverse: true, by: 'y' }],
      encode: {
        x: 'letter',
        y: 'frequency',
        color: 'letter',
      },
      scale: { color: colorScale },
    },
    {
      type: 'interval',
      x: 300,
      y: 50,
      width: 300,
      height: 300,
      coordinate: { type: 'theta' },
      transform: [{ type: 'stackY' }],
      legend: false,
      scale: { color: colorScale },
      encode: {
        y: 'frequency',
        color: 'letter',
      },
    },
  ],
});

chart.render();
