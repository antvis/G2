import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/deaths.json',
  },
  encode: { x: 'Month', y: 'Death', color: 'Type' },
  transform: [
    { type: 'stackY' },
    { type: 'stackEnter', groupBy: ['color', 'x'], duration: 2000 },
  ],
  scale: { y: { type: 'sqrt' } },
  coordinate: { type: 'polar' },
  animate: { enter: { type: 'waveIn' } },
  axis: { y: false },
});

chart.render();
