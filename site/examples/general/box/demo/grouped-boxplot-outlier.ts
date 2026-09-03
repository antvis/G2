import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  coordinate: { transform: [{ type: 'transpose' }] },
  children: [
    {
      type: 'boxplot',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/penguins.json',
      },
      encode: {
        x: 'species',
        y: 'flipper_length_mm',
        color: 'sex',
        series: 'sex',
      },
    },
  ],
});

chart.render();
