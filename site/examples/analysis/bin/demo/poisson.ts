import { Chart } from '@antv/g2';
import { randomPoisson } from 'd3-random';

const random = randomPoisson(Math.pow(10, 2.6));

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .rect()
  .data(new Array(5000).fill(0).map(random))
  .encode('x', (d) => d)
  .transform({ type: 'binX', y: 'count' })
  .style('stroke', 'white')
  .tooltip({
    title: (d, i, data, column) => ({
      value: `${column.x.value[i]} ~ ${column.x1.value[i]}`,
    }),
  });

chart.render();
