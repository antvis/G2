import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'flipper_length_mm',
    color: 'species',
    shape: 'violin',
  },
  style: {
    opacity: 0.5,
    strokeOpacity: 0.5,
    point: false,
  },
});

chart.render();
