import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: 0.65,
  style: {
    shape: 'triangle',
    fill: '#1890ff',
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
    contentFill: '#000',
    contentStroke: '#fff',
    contentFontSize: 32,
    contentLineWidth: 3,
  },
});

chart.render();
