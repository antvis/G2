import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  })
  .encode('x', 'weight')
  .encode('y', 'height')
  .encode('color', 'sex')
  .transform({ type: 'bin', opacity: 'count' })
  .legend('opacity', false)
  .style('inset', 0.5)
  .tooltip({
    title: { channel: 'opacity' },
    items: [
      (d, i, data, column) => ({
        name: 'weight',
        value: `${column.x.value[i]}, ${column.x1.value[i]}`,
      }),
      (d, i, data, column) => ({
        name: 'height',
        value: `${column.y.value[i]}, ${column.y1.value[i]}`,
      }),
    ],
  });

chart.render();
