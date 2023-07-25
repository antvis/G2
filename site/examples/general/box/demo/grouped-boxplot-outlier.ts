import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .boxplot()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  })
  .encode('x', 'species')
  .encode('y', 'flipper_length_mm')
  .encode('color', 'sex')
  .encode('series', 'sex');

chart.render();
