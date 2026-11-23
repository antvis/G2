import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
    ],
  },
  encode: { x: (d) => +d.culmen_depth_mm, y: (d) => +d.culmen_length_mm },
});

chart.render();
