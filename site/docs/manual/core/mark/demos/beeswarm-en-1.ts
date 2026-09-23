import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = Array.from({ length: 200 }, (_, i) => {
  return {
    x: `G${(i % 6) + 1}`,
    y: 40 + Math.random() * 220,
  };
});

chart.options({
  type: 'beeswarm',
  data,
  encode: {
    x: 'x',
    y: 'y',
    size: 4,
  },
  scale: {
    y: {
      nice: true,
      domainMin: 0,
    },
  },
  legend: {
    size: false,
  },
  axis: {
    x: { title: false },
    y: { title: false },
  },
});

chart.render();
