import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  autoFit: true,
  height: 500,
  data: {
    value: [
      { time: '2025.07.11', value: 15 },
      { time: '2025.07.12', value: 50 },
      { time: '2025.07.13', value: 50 },
      { time: '2025.07.14', value: 86 },
      { time: '2025.07.15', value: 60 },
    ],
  },
  encode: { x: 'time', y: 'value', color: 'value' },
  scale: { color: { type: 'linear', range: ['#ffffff', '#1890FF'] } },
  coordinate: {
    type: 'helix',
    startAngle: 1.5707963267948966,
    endAngle: 39.269908169872416,
  },
  animate: { enter: { type: 'fadeIn' } },
  tooltip: { title: 'time' },
});

chart.render();
