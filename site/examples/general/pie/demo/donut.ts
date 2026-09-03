/**
 * A recreation of this demo: https://observablehq.com/@d3/donut-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 640,
});

chart.options({
  type: 'view',
  coordinate: { type: 'theta', innerRadius: 0.6 },
  children: [
    {
      type: 'interval',
      transform: [{ type: 'stackY' }],
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
      },
      encode: {
        y: 'value',
        color: 'name',
      },
      style: {
        stroke: 'white',
        inset: 1,
        radius: 10,
      },
      scale: {
        color: {
          palette: 'spectral',
          offset: (t) => t * 0.8 + 0.1,
        },
      },
      labels: [
        { text: 'name', fontSize: 10, fontWeight: 'bold' },
        {
          text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
          fontSize: 9,
          dy: 12,
        },
      ],
      animate: {
        enter: { type: 'waveIn' },
      },
      legend: false,
    },
  ],
});

chart.render();
