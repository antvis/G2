import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/species.json',
  transform: [
    {
      type: 'kde',
      field: 'y',
      groupBy: ['x'],
      size: 20,
    },
  ],
});

chart
  .density()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', 'x')
  .encode('size', 'size')
  .tooltip(false);

chart.render();
