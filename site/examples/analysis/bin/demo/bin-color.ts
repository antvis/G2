import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
  })
  .encode('x', 'IMDB Rating')
  .encode('y', 'Rotten Tomatoes Rating')
  .transform({ type: 'bin', color: 'count', thresholdsX: 30, thresholdsY: 20 })
  .scale('color', { palette: 'ylGnBu' })
  .tooltip({
    title: { channel: 'color' },
    items: [
      (d, i, data, column) => ({
        name: 'IMDB Rating',
        value: `${column.x.value[i]}, ${column.x1.value[i]}`,
      }),
      (d, i, data, column) => ({
        name: 'Rotten Tomatoes Rating',
        value: `${column.y.value[i]}, ${column.y1.value[i]}`,
      }),
    ],
    render: () => '1',
  });

chart.render();
