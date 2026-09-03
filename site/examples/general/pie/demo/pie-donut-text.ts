/**
 * A recreation of this demo:
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 640,
  padding: 0,
  inset: 50,
});

// Relative position
// Absolute position
chart.options({
  type: 'view',
  coordinate: { type: 'theta', innerRadius: 0.6 },
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
      },
      transform: [{ type: 'stackY' }],
      encode: {
        y: 'value',
        color: 'name',
      },
      scale: {
        color: {
          palette: 'spectral',
          offset: (t) => t * 0.8 + 0.1,
        },
      },
      legend: false,
    },
    {
      type: 'text',
      style: {
        text: 'Donut',
        x: '50%',
        y: '50%',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    },
    {
      type: 'text',
      style: {
        text: 'chart',
        x: 640 / 2 - 16,
        y: 360,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    },
  ],
});

chart.render();
