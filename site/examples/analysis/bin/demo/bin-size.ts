import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/movies.json',
      },
      encode: {
        x: 'IMDB Rating',
        y: 'Rotten Tomatoes Rating',
        shape: 'point',
      },
      transform: [
        { type: 'bin', size: 'count', thresholdsX: 10, thresholdsY: 10 },
      ],
      tooltip: {
        title: { channel: 'size' },
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
      },
    },
  ],
});

chart.render();
