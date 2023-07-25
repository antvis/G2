import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/diamond.json',
});

chart.scale('x', { nice: true, domainMin: -0.5 });
chart.scale('y', { nice: true, domainMin: -2000 });
chart.scale('color', { nice: true });

chart
  .heatmap()
  .data({
    transform: [
      {
        type: 'custom',
        callback: (data) => {
          const dv = new DataSet.View().source(data);
          dv.transform({
            type: 'kernel-smooth.density',
            fields: ['carat', 'price'],
            as: ['carat', 'price', 'density'],
          });
          return dv.rows;
        },
      },
    ],
  })
  .encode('x', 'carat')
  .encode('y', 'price')
  .encode('color', 'density')
  .style({
    opacity: 0.3,
    gradient: [
      [0, 'white'],
      [0.2, 'blue'],
      [0.4, 'cyan'],
      [0.6, 'lime'],
      [0.8, 'yellow'],
      [0.9, 'red'],
    ],
  });

chart.point().encode('x', 'carat').encode('y', 'price');

chart.render();
