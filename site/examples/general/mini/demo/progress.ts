import { Chart } from '@antv/g2';

const progress = 0.7;

const chart = new Chart({
  container: 'container',
  width: 480,
  height: 60,
});

chart.options({
  type: 'view',
  coordinate: {
    transform: [{ type: 'transpose' }],
  },
  interaction: {
    tooltip: false,
  },
  children: [
    {
      type: 'interval',
      data: [1, progress],
      encode: {
        y: (d) => d,
        color: (d, idx) => idx,
      },
      scale: {
        y: { domain: [0, 1] },
        color: { range: ['#000000', '#a0ff03'] },
      },
      legend: false,
      axis: false,
    },
    {
      type: 'text',
      style: {
        text: `${progress * 100}%`,
        x: '50%',
        y: '50%',
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'bold',
      },
    },
  ],
});

chart.render();
